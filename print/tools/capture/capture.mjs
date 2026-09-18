#!/usr/bin/env node

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

/** Hides anything pinned to the top of the window. Returns an undo. */
async function hideFixedChrome(page) {
  const id = '__capture_hide_chrome__'
  await page.addStyleTag({
    content: `header.fixed, [data-slot="top-nav"] { visibility: hidden !important; }`,
    // A tagged style element so the undo removes exactly this one.
  }).then((handle) => handle.evaluate((el, v) => el.setAttribute('data-id', v), id))
  return async () => {
    await page.evaluate((v) => document.querySelector(`style[data-id="${v}"]`)?.remove(), id)
  }
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

    // Playwright scrolls a tall element to the top of the window before
    // shooting it, which slides the page's own heading under the fixed top bar
    // — every `main` figure came out with its title sliced in half. The bar is
    // documented on its own in chapter 2, so it is simply not wanted here.
    const restoreChrome = recipe.clip === 'main' ? await hideFixedChrome(page) : null
    try {
      if (target.locator) await target.locator.screenshot(shot)
      else await page.screenshot({ ...shot, clip: target.clip, fullPage: Boolean(recipe.fullPage) })
    } finally {
      if (restoreChrome) await restoreChrome()
    }

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

// Merge into whatever the last run left, rather than replace it: a
// `--only report-share` run used to reduce the report to one row, throwing away
// the record of the other sixty-one. Each row keeps the host it came from,
// because a handful of figures (the share links) are deliberately taken against
// the demo host so the address in the picture is the real one.
const previous = fs.existsSync(REPORT) ? JSON.parse(fs.readFileSync(REPORT, 'utf8')) : { figures: [] }
const merged = new Map((previous.figures ?? []).map((r) => [r.key, r]))
const capturedAt = new Date().toISOString()
for (const row of results) merged.set(row.key, { ...row, baseUrl: opts.baseUrl, capturedAt })

fs.writeFileSync(
  REPORT,
  `${JSON.stringify(
    {
      capturedAt,
      baseUrl: opts.baseUrl,
      world,
      figures: [...merged.values()].sort((a, b) => a.chapter - b.chapter || a.key.localeCompare(b.key)),
    },
    null,
    2,
  )}\n`,
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
