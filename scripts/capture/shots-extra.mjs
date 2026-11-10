import { launch, context, login, ready, BASE } from './lib.mjs'
import { readFileSync, writeFileSync } from 'node:fs'
const OUT = new URL('./out/', import.meta.url).pathname
const state = JSON.parse(readFileSync(OUT + 'state.json', 'utf8'))
const only = process.argv[2]
const step = async (n, fn) => { if (only && !n.startsWith(only)) return; try { await fn(); console.log('ok', n) } catch (e) { console.log('FAIL', n, e.message.split('\n')[0]) } }
const go = async (p, path) => { await p.goto(path.startsWith('http') ? path : BASE + path, { waitUntil: 'domcontentloaded' }); await ready(p, 900) }
const btn = (p, name) => p.getByRole('button', { name }).first()
const hideSeats = (p) => p.evaluate(() => {
  for (const el of document.querySelectorAll('main *')) {
    const t = (el.innerText || '').trim()
    if (el.children.length <= 3 && /^(\d+ of \d+ users|Users\s*\n?\s*\d+ of \d+)$/i.test(t)) el.style.visibility = 'hidden'
  }
})
const b = await launch()

{ const c = await context(b); const p = await c.newPage(); await login(p, 'adaeze.okafor@meridian-demo.org')
  await step('report-share-link', async () => {
    await go(p, '/reports/7f640501-ec97-4d05-8864-0d6104fb5458')
    const mk = btn(p, /Create a read-only link/)
    if (await mk.count()) { await mk.scrollIntoViewIfNeeded(); await mk.click(); await p.waitForTimeout(2500) }
    const card = p.getByText(/Switch the link off/).first(); await card.scrollIntoViewIfNeeded(); await p.waitForTimeout(600)
    await p.screenshot({ path: OUT + 'report-share-link.png' })
    const vals = await p.$$eval('input', (is) => is.map((i) => i.value))
    const html = (await p.content()) + vals.join(' ')
    const m = html.match(/https?:\/\/[^"'<\s]+\/r\/[A-Za-z0-9_-]+/); state.reportLink = m && m[0]
    await go(p, '/reports/7f640501-ec97-4d05-8864-0d6104fb5458'); await p.screenshot({ path: OUT + 'report-published.png' })
  })
  await step('form-link', async () => {
    await go(p, '/forms/9432f1f8-22d7-40da-9d17-eae78afff0bc'); await btn(p, /^Share$/).click(); await p.waitForTimeout(800)
    const vals = await p.$$eval('[role=dialog] input, [role=dialog] a, [role=dialog] code', (is) => is.map((i) => i.value || i.href || i.textContent))
    state.formLink = vals.find((v) => /\/f\//.test(v || '')) || null
  })
  await step('form-field-logic', async () => {
    await go(p, '/forms/9432f1f8-22d7-40da-9d17-eae78afff0bc')
    const card = p.getByText(/If not, size of the difference/).first(); await card.scrollIntoViewIfNeeded(); await card.click(); await p.waitForTimeout(800)
    const sw = p.getByText(/Show this question only when/).first(); await sw.scrollIntoViewIfNeeded(); await p.waitForTimeout(500)
    await p.screenshot({ path: OUT + 'form-field-logic.png' })
  })
  await c.close() }

{ const c = await context(b); const p = await c.newPage(); await login(p, 'director@meridian-demo.org')
  await step('billing', async () => { await go(p, '/billing'); await hideSeats(p); await p.screenshot({ path: OUT + 'billing.png' }) })
  await step('people', async () => { await go(p, '/people'); await hideSeats(p); await p.screenshot({ path: OUT + 'people.png' }) })
  await c.close() }

await step('public-pages', async () => {
  const c = await context(b); const p = await c.newPage()
  if (state.dashboardLink) { await go(p, state.dashboardLink); await p.waitForTimeout(2500); await p.screenshot({ path: OUT + 'public-dashboard.png' }) }
  if (state.reportLink) { await go(p, state.reportLink); await p.waitForTimeout(1500); await p.screenshot({ path: OUT + 'public-report.png' }) }
  await go(p, '/login'); await p.screenshot({ path: OUT + 'login.png' })
  await go(p, 'https://app.impactmel.com/signup'); await p.waitForTimeout(1200); await p.screenshot({ path: OUT + 'signup-plan.png' })
  await c.close()
})
await step('phone-form', async () => {
  if (!state.formLink) throw new Error('no form link')
  const c = await context(b, { width: 390, height: 844, extra: { isMobile: true, hasTouch: true } }); const p = await c.newPage()
  await go(p, state.formLink); await p.waitForTimeout(1500); await p.screenshot({ path: OUT + 'phone-form.png' })
  await p.mouse.wheel(0, 900); await p.waitForTimeout(800); await p.screenshot({ path: OUT + 'phone-form-2.png' })
  await c.close()
})
await step('funder', async () => {
  const c = await context(b); const p = await c.newPage(); await login(p, 'tamunoibi.briggs@tallgrass-demo.org')
  await go(p, '/portfolio'); await p.waitForTimeout(1500); await p.screenshot({ path: OUT + 'funder-portfolio.png' })
  await go(p, '/requests'); await p.screenshot({ path: OUT + 'funder-requests.png' })
  await go(p, '/grantees'); await p.screenshot({ path: OUT + 'funder-grantees.png' })
  await c.close()
})
writeFileSync(OUT + 'state.json', JSON.stringify(state, null, 2)); console.log(state)
await b.close()
