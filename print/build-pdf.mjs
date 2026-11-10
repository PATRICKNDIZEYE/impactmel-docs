// Printed user guide from the built site: node print/build-pdf.mjs (after npm run build; preview running on PORT).
import { chromium } from '/Users/ndizeye/Documents/Desktop/Impactmel/video-studio/node_modules/playwright/index.mjs'
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const SITE = `http://localhost:${process.env.PORT || 4179}`
const OUT = join(ROOT, 'print/out'); const CACHE = join(ROOT, 'print/.cache')
mkdirSync(OUT, { recursive: true }); mkdirSync(CACHE, { recursive: true })
const RELEASE = 'v0.10.36', DATE = 'November 2026'

const PARTS = [
  ['Getting started', ['/introduction', '/getting-started/sign-up', '/getting-started/set-up-workspace', '/getting-started/invite-your-team', '/getting-started/finding-your-way']],
  ['Roles', ['/roles/', '/roles/organisation-admin', '/roles/director', '/roles/me-officer', '/roles/programme-manager', '/roles/field-officer', '/roles/finance-officer', '/roles/viewer-and-funder']],
  ['Plan', ['/manual/programmes-and-projects', '/manual/results-framework', '/manual/indicators', '/manual/reporting-periods']],
  ['Collect', ['/manual/forms', '/manual/collecting-data', '/manual/participants', '/manual/activities']],
  ['Check', ['/manual/review', '/manual/budgets', '/manual/risks']],
  ['Report and share', ['/manual/analysis', '/manual/sharing-dashboards', '/manual/reports', '/manual/funders']],
  ['Connect and administer', ['/manual/integrations', '/manual/ai', '/manual/administration']],
  ['Reference', ['/security', '/plans', '/faq', '/release-notes']],
]

const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
const page = await browser.newPage()

// 1. Pull each page's rendered content.
const chapters = []
for (const [part, paths] of PARTS) for (const path of paths) {
  await page.goto(SITE + path, { waitUntil: 'networkidle' })
  const c = await page.evaluate(() => {
    const doc = document.querySelector('.vp-doc > div') || document.querySelector('.vp-doc')
    const el = doc.cloneNode(true)
    el.querySelectorAll('a.header-anchor').forEach((a) => a.remove())
    const h1 = el.querySelector('h1'); const title = h1.textContent.trim(); h1.remove()
    return { title, html: el.innerHTML }
  })
  chapters.push({ part, path, ...c })
}

// 2. Print-sized JPEGs for screenshots.
function printImage(src) {
  const name = src.split('/').pop().replace(/\.webp$/, '')
  const jpg = join(CACHE, name + '.jpg')
  if (!existsSync(jpg)) execFileSync('python3', ['-c', `
from PIL import Image
im = Image.open(${JSON.stringify(join(ROOT, 'public', src))}).convert('RGB')
w = 1100 if 'phone' in ${JSON.stringify(name)} else 1800
if im.width > w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
im.save(${JSON.stringify(jpg)}, quality=80, optimize=True, progressive=True)`])
  return 'file://' + jpg
}

// 3. Number chapters, sections and figures; make links absolute.
let n = 0
const toc = []
for (const ch of chapters) {
  n++; ch.n = n; let s = 0, f = 0
  ch.html = ch.html
    .replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (_, a, t) => { s++; const text = t.replace(/<[^>]+>/g, '').trim(); toc.push({ level: 2, n: `${n}.${s}`, text, ch: n }); return `<h2${a}><span class="num">${n}.${s}</span> ${t}</h2>` })
    .replace(/<figure class="shot([^"]*)"><img src="([^"]+)"([^>]*)><figcaption>([\s\S]*?)<\/figcaption><\/figure>/g,
      (_, cls, src, rest, cap) => { f++; return `<figure class="shot${cls}"><img src="${printImage(src)}"${rest.replace(/loading="lazy"/, '')}><figcaption><b>Figure ${n}.${f}</b> ${cap}</figcaption></figure>` })
    .replace(/href="\/(?!\/)/g, 'href="https://docs.impactmel.com/')
  toc.push({ level: 1, n: String(n), text: ch.title, ch: n, part: ch.part })
}
toc.sort((a, b) => a.ch - b.ch || a.level - b.level || 0)

const css = readFileSync(join(ROOT, 'print/print.css'), 'utf8')
const logo = readFileSync(join(ROOT, 'public/logo-black.svg'), 'utf8')
const fonts = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap">'

function bodyHtml(pages = {}) {
  let lastPart = ''
  const tocRows = toc.map((t) => {
    let head = ''
    if (t.level === 1 && t.part !== lastPart) { lastPart = t.part; head = `<div class="toc-part">${t.part}</div>` }
    return `${head}<div class="toc-row l${t.level}"><span class="toc-n">${t.n}</span><span class="toc-t">${t.text}</span><span class="toc-dots"></span><span class="toc-p">${pages[t.n] ?? '00'}</span></div>`
  }).join('')
  let part = ''
  const body = chapters.map((ch) => {
    const partPage = ch.part !== part ? (part = ch.part, `<section class="part"><div class="part-label">Part</div><h1 class="part-title">${ch.part}</h1></section>`) : ''
    return `${partPage}<section class="chapter"><h1 class="ch-title"><span class="num">${ch.n}</span> ${ch.title}</h1>${ch.html}</section>`
  }).join('\n')
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8">${fonts}<style>${css}</style></head><body>
<section class="toc"><h1 class="toc-title">Contents</h1>${tocRows}</section>
<section class="about"><h1 class="ch-title">About this guide</h1>
<p>This guide describes ImpactMEL release ${RELEASE}, with the interface introduced in version 2. It is printed from the online documentation at <a href="https://docs.impactmel.com">docs.impactmel.com</a>, which is kept up to date with each release.</p>
<p>Screenshots come from the ImpactMEL demonstration workspace, Meridian Impact Alliance. Its people and figures are invented. Links in this guide open the matching page online.</p>
<p>Plans and prices are published at <a href="https://www.impactmel.com/pricing">impactmel.com/pricing</a>. For help, write to <a href="mailto:inquiries@impactmel.com">inquiries@impactmel.com</a>.</p></section>
${body}</body></html>`
}

const coverHtml = `<!doctype html><html><head><meta charset="utf-8">${fonts}<style>${css}</style></head><body class="cover-body">
<section class="cover"><div class="cover-logo">${logo}</div>
<div class="cover-main"><div class="cover-kicker">User guide</div><h1>ImpactMEL</h1>
<p class="cover-sub">Plan, collect, check and report on your programmes. A task-by-task guide for every role.</p></div>
<div class="cover-foot"><div>Release ${RELEASE}</div><div>${DATE}</div><div>docs.impactmel.com</div></div></section></body></html>`

const footer = `<div style="width:100%;font-family:Inter,Helvetica,Arial,sans-serif;font-size:7.5pt;color:#71717a;padding:0 18mm;display:flex;justify-content:space-between"><span>ImpactMEL User Guide · ${RELEASE}</span><span class="pageNumber"></span></div>`

async function render(html, file, withFooter) {
  const f = join(OUT, file.replace('.pdf', '.html')); writeFileSync(f, html)
  await page.goto('file://' + f, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.pdf({ path: join(OUT, file), format: 'A4', printBackground: true, preferCSSPageSize: true,
    displayHeaderFooter: withFooter, headerTemplate: '<span></span>', footerTemplate: withFooter ? footer : '<span></span>',
    margin: withFooter ? { top: '20mm', bottom: '20mm', left: '0', right: '0' } : { top: 0, bottom: 0, left: 0, right: 0 } })
}

// 4. Two passes: render, find each heading's page, render again with real page numbers.
await render(bodyHtml(), 'body.pdf', true)
const pages = {}
const count = Number(execFileSync('pdfinfo', [join(OUT, 'body.pdf')]).toString().match(/Pages:\s+(\d+)/)[1])
const norm = (s) => s.replace(/\s+/g, ' ').trim()
const texts = []
for (let p = 1; p <= count; p++) texts.push(norm(execFileSync('pdftotext', ['-f', p, '-l', p, '-layout', join(OUT, 'body.pdf'), '-']).toString()))
const tocPages = texts.findIndex((t) => t.includes('About this guide'))
for (const t of toc) {
  const needle = norm(`${t.n} ${t.text}`).slice(0, 40)
  for (let p = tocPages; p < count; p++) if (texts[p].includes(needle)) { pages[t.n] = p + 1; break }
  if (!pages[t.n]) console.warn('no page for', t.n, t.text)
}
await render(bodyHtml(pages), 'body.pdf', true)
await render(coverHtml, 'cover.pdf', false)
await browser.close()

const final = join(OUT, 'ImpactMEL-User-Guide.pdf')
execFileSync('python3', ['-c', `
from pypdf import PdfWriter, PdfReader
w = PdfWriter()
for f in ["${join(OUT, 'cover.pdf')}", "${join(OUT, 'body.pdf')}"]:
    for pg in PdfReader(f).pages: w.add_page(pg)
w.add_metadata({"/Title": "ImpactMEL User Guide", "/Author": "ImpactMEL", "/Subject": "User guide for release ${RELEASE}"})
w.compress_identical_objects()
w.write("${final}")`])
console.log('wrote', final, count + 1, 'pages')
