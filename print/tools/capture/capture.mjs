#!/usr/bin/env node
//
// Capture every figure in the manual from the demo instance.
//
//   node capture.mjs                     everything
//   node capture.mjs --only review-      keys starting review-
//   node capture.mjs --chapter 12        one chapter
//   node capture.mjs --list              what would run, and as whom
//   node capture.mjs --headed            watch it work
//   node capture.mjs --keep-going        do not stop at the first failure
//
// Images land in public/user-manual/images/<key>.png, which is where both the
// print build and the docs site look for them. A run also writes
// capture-report.json: per figure the url, the region, the pixel size and the
// duration, so a figure that captured an empty state is visible without
// opening sixty PNGs.

import fs from 'node:fs'
import path from 'node:path'
import { openBrowser, contextForRole, assertDemoHost, settle, ROLES } from './lib/browser.mjs'
import { discoverWorld, describeWorld } from './lib/world.mjs'
import { resolveClip } from './lib/regions.mjs'
import { RECIPES } from './figures/index.mjs'

const HERE = import.meta.dirname
const OUT_DIR = path.resolve(HERE, '../../../public/user-manual/images')
const REPORT = path.join(OUT_DIR, '..', 'capture-report.json')

function parseArgs(argv) {
  const opts = {
    baseUrl: process.env.CAPTURE_BASE_URL || 'https://demo.impactmel.com',
    only: [],
    chapters: [],
    headed: false,
    list: false,
    freshAuth: false,
    keepGoing: false,
    iKnow: false,
    outDir: OUT_DIR,
  }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--only') opts.only.push(argv[++i])
    else if (a === '--chapter') opts.chapters.push(Number(argv[++i]))
    else if (a === '--base-url') opts.baseUrl = argv[++i]
    else if (a === '--out') opts.outDir = path.resolve(argv[++i])
    else if (a === '--headed') opts.headed = true
    else if (a === '--list') opts.list = true
    else if (a === '--fresh-auth') opts.freshAuth = true
    else if (a === '--keep-going') opts.keepGoing = true
    else if (a === '--i-know') opts.iKnow = true
    else throw new Error(`unknown option '${a}'`)
  }
  return opts
}

function selected(recipes, { only, chapters }) {
  return recipes.filter((r) => {
    if (chapters.length && !chapters.includes(r.chapter)) return false
    if (only.length && !only.some((p) => r.key.startsWith(p))) return false
    return true
  })
}

const opts = parseArgs(process.argv.slice(2))
assertDemoHost(opts.baseUrl, opts.iKnow)

const chosen = selected(RECIPES, opts)
if (!chosen.length) {
  console.error('no figures matched')
  process.exit(1)
}

if (opts.list) {
  const rows = chosen.map((r) => `  ${String(r.chapter).padStart(2)}  ${r.key.padEnd(32)} as ${r.as}`)
  console.log(`${chosen.length} figure(s):\n${rows.join('\n')}`)
  process.exit(0)
}

fs.mkdirSync(opts.outDir, { recursive: true })

const browser = await openBrowser({ headed: opts.headed })
const contexts = new Map()
const results = []
let failures = 0

async function contextFor(role) {
  if (!contexts.has(role)) {
    process.stdout.write(`  signing in as ${role} (${ROLES[role].email ?? 'nobody'})\n`)
    contexts.set(role, await contextForRole(browser, role, { baseUrl: opts.baseUrl, fresh: opts.freshAuth }))
  }
  return contexts.get(role)
}

// The world is discovered once, as the officer, because every recipe must
// point at the same project — two figures of "the same project" that show
// different projects is the kind of thing a reader notices and we do not.
const seedContext = await contextFor('me_officer')
const seedPage = await seedContext.newPage()
await seedPage.goto('/dashboard', { waitUntil: 'domcontentloaded' })
const world = await discoverWorld(seedPage)
await seedPage.close()
console.log(`\n${describeWorld(world)}\n`)

for (const recipe of chosen) {
  const started = Date.now()
  const context = await contextFor(recipe.as)
  const page = await context.newPage()
  const row = { key: recipe.key, chapter: recipe.chapter, as: recipe.as }

  try {
    const url = typeof recipe.url === 'function' ? recipe.url(world) : recipe.url
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 })
    await settle(page)

    if (recipe.prepare) await recipe.prepare(page, world)
    await settle(page)
    if (recipe.settleExtra) await page.waitForTimeout(recipe.settleExtra)

    const target = await resolveClip(page, recipe.clip, {
      padding: recipe.padding ?? 0,
      maxHeight: recipe.maxHeight ?? 2200,
    })
    const file = path.join(opts.outDir, `${recipe.key}.png`)
    const shot = { path: file, animations: 'disabled', scale: 'device' }

    if (target.locator) await target.locator.screenshot(shot)
    else await page.screenshot({ ...shot, clip: target.clip, fullPage: Boolean(recipe.fullPage) })

    const { size } = fs.statSync(file)
    row.url = page.url().replace(opts.baseUrl, '')
    row.region = typeof recipe.clip === 'function' ? 'fn' : (recipe.clip ?? 'viewport')
    row.bytes = size
    row.ms = Date.now() - started
    row.ok = true

    // A 12KB PNG of this interface is a blank panel. Worth saying out loud
    // rather than discovering at the printer.
    row.suspiciouslySmall = size < 25_000
    console.log(
      `  ✓ ${recipe.key.padEnd(32)} ${String(Math.round(size / 1024)).padStart(5)}KB  ${row.ms}ms` +
        (row.suspiciouslySmall ? '   ← very small, check it' : ''),
    )
  } catch (err) {
    failures++
    row.ok = false
    row.error = String(err.message ?? err).split('\n')[0].slice(0, 300)
    row.url = page.url().replace(opts.baseUrl, '')
    console.log(`  ✕ ${recipe.key.padEnd(32)} ${row.error}`)
    const debug = path.join(opts.outDir, '..', 'capture-failures')
    fs.mkdirSync(debug, { recursive: true })
    await page.screenshot({ path: path.join(debug, `${recipe.key}.png`), fullPage: true }).catch(() => {})
    if (!opts.keepGoing) {
      results.push(row)
      await page.close()
      break
    }
  }
  results.push(row)
  await page.close()
}

fs.writeFileSync(
  REPORT,
  `${JSON.stringify({ capturedAt: new Date().toISOString(), baseUrl: opts.baseUrl, world, figures: results }, null, 2)}\n`,
)

await browser.close()

const ok = results.filter((r) => r.ok).length
const small = results.filter((r) => r.suspiciouslySmall).length
console.log(`\n${ok}/${results.length} captured${failures ? `, ${failures} failed` : ''}${small ? `, ${small} suspiciously small` : ''}`)
console.log(`report: ${path.relative(process.cwd(), REPORT)}`)
if (failures) {
  console.log('failure screenshots (full page, for diagnosis): public/user-manual/capture-failures/')
  process.exit(1)
}
