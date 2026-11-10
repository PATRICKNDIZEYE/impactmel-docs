// Captures that need clicks: dialogs, panels, publishing and share links.
import { launch, context, login, ready, BASE } from './lib.mjs'
import { writeFileSync, mkdirSync } from 'node:fs'
const OUT = new URL('./out/', import.meta.url).pathname
mkdirSync(OUT, { recursive: true })
const only = process.argv[2]
const state = {}

const shot = async (p, name, opts = {}) => {
  await p.waitForTimeout(opts.wait ?? 900)
  await p.screenshot({ path: OUT + name + '.png', ...opts.shot })
  console.log('ok', name)
}
const step = async (name, fn) => {
  if (only && !name.startsWith(only)) return
  try { await fn() } catch (e) { console.log('FAIL', name, e.message.split('\n')[0]) }
}
const go = async (p, path) => { await p.goto(BASE + path, { waitUntil: 'domcontentloaded' }); await ready(p, 900) }
const btn = (p, name) => p.getByRole('button', { name, exact: false }).first()
const esc = async (p) => { await p.keyboard.press('Escape'); await p.waitForTimeout(400) }

const b = await launch()
async function as(email, fn) {
  const c = await context(b); const p = await c.newPage()
  await login(p, email); await fn(p, c); await c.close()
}

await as('adaeze.okafor@meridian-demo.org', async (p) => {
  await step('review-detail', async () => { await go(p, '/review/8fb578b1-3749-4cf6-86be-147e8563d8cf'); await shot(p, 'review-detail') })
  await step('review-return', async () => { await btn(p, /^Return$/).click(); await shot(p, 'review-return'); await esc(p) })
  await step('review-ask', async () => { await btn(p, /Ask a colleague/).click(); await shot(p, 'review-ask'); await esc(p) })
  await step('review-ai', async () => {
    await btn(p, /Explain with AI/).click()
    await p.getByText(/AI-drafted|held back/).first().waitFor({ timeout: 60000 })
    await p.getByText(/AI-drafted|held back/).first().scrollIntoViewIfNeeded()
    await shot(p, 'review-ai')
  })
  await step('periods-dialog', async () => { await go(p, '/home'); await btn(p, /^Manage$/).click(); await shot(p, 'periods-dialog'); await esc(p) })
  await step('form-builder', async () => {
    await go(p, '/forms/9432f1f8-22d7-40da-9d17-eae78afff0bc'); await shot(p, 'form-builder')
    const logic = p.getByText(/Shown only when/).first()
    if (await logic.count()) { await logic.scrollIntoViewIfNeeded(); await logic.click(); await shot(p, 'form-field-logic') }
  })
  await step('form-share', async () => {
    await go(p, '/forms/9432f1f8-22d7-40da-9d17-eae78afff0bc'); await btn(p, /^Share$/).click(); await shot(p, 'form-share')
    const t = await p.locator('[role=dialog]').innerText(); const m = t.match(/https?:\/\/\S+\/f\/[A-Za-z0-9_-]+/)
    state.formLink = m && m[0]; await esc(p)
  })
  await step('form-responses', async () => { await go(p, '/forms/9432f1f8-22d7-40da-9d17-eae78afff0bc?tab=responses'); await shot(p, 'form-responses') })
  await step('form-new', async () => { await go(p, '/forms'); await btn(p, /^New form$/).click(); await shot(p, 'form-new'); await esc(p) })
  await step('framework-ai', async () => { await go(p, '/framework'); await btn(p, /Draft from a proposal/).click(); await shot(p, 'framework-ai'); await esc(p) })
  await step('indicator-detail', async () => { await go(p, '/indicators/7ad5de6c-b827-40f3-a476-21a3adb00c12'); await shot(p, 'indicator-detail') })
  await step('indicator-import', async () => { await go(p, '/indicators'); await btn(p, /Import figures/).click(); await shot(p, 'indicator-import'); await esc(p) })
  await step('indicator-new', async () => { await go(p, '/indicators'); await btn(p, /New indicator/).click(); await shot(p, 'indicator-new'); await esc(p) })
  await step('report-new', async () => { await go(p, '/reports'); await btn(p, /New report/).click(); await shot(p, 'report-new'); await esc(p) })
  await step('report-view', async () => {
    await go(p, '/reports/7f640501-ec97-4d05-8864-0d6104fb5458'); await shot(p, 'report-view')
    const h = p.getByText('Results against targets').first(); await h.scrollIntoViewIfNeeded(); await p.mouse.wheel(0, -80); await shot(p, 'report-results')
  })
  await step('report-edit', async () => {
    await go(p, '/reports/7f640501-ec97-4d05-8864-0d6104fb5458'); await btn(p, /Edit report/).click(); await ready(p, 600)
    await shot(p, 'report-edit')
    const d = p.getByText('Report details').first(); await d.scrollIntoViewIfNeeded(); await shot(p, 'report-details')
    const done = btn(p, /^Done$/); if (await done.count()) await done.click()
  })
  await step('analysis-chart', async () => {
    await go(p, '/analysis')
    await p.getByText('Choose an indicator').first().click(); await p.waitForTimeout(600)
    await p.getByRole('option').first().click().catch(async () => { await p.keyboard.press('Enter') })
    await ready(p, 1500); await esc(p); await shot(p, 'analysis-chart')
  })
  await step('dashboard', async () => {
    await go(p, '/analysis')
    await p.getByText(/Preview \d+ charts/).first().click(); await ready(p, 1500)
    await shot(p, 'analysis-recommended')
    await btn(p, /Save dashboard/).click(); await p.waitForURL(/dashboards\/[0-9a-f-]{36}/, { timeout: 30000 }); await ready(p, 2500)
    state.dashboard = p.url(); await shot(p, 'dashboard')
    await btn(p, /^Share$/).click(); await shot(p, 'dashboard-share')
    const create = btn(p, /Create|Make a link|Turn on/); await create.click(); await p.waitForTimeout(2500)
    await shot(p, 'dashboard-share-link')
    const t = await p.locator('[role=dialog]').innerText(); const m = t.match(/https?:\/\/\S+\/share\/dashboard\/[A-Za-z0-9_-]+/)
    state.dashboardLink = m && m[0]
    if (!state.dashboardLink) { const v = await p.locator('[role=dialog] input').first().inputValue().catch(() => null); state.dashboardLink = v }
    await esc(p)
  })
  await step('report-publish', async () => {
    await go(p, '/reports/7f640501-ec97-4d05-8864-0d6104fb5458')
    await btn(p, /^Publish$/).click(); await p.waitForTimeout(800); await shot(p, 'report-publish-confirm')
    await p.locator('[role=dialog], [role=alertdialog]').getByRole('button', { name: /Publish/ }).last().click()
    await ready(p, 2500); await shot(p, 'report-published')
    const mk = btn(p, /Create a read-only link/); await mk.scrollIntoViewIfNeeded(); await mk.click(); await p.waitForTimeout(2500)
    const card = p.getByText(/Switch the link off/).first(); await card.scrollIntoViewIfNeeded(); await shot(p, 'report-share-link')
    const html = await p.content(); const m = html.match(/https?:\/\/[^"'<\s]+\/r\/[A-Za-z0-9_-]+/); state.reportLink = m && m[0]
    const snap = p.getByText(/Payload hash/).first(); await snap.scrollIntoViewIfNeeded(); await shot(p, 'report-fingerprint')
  })
})

await as('clarisse.uwase@meridian-demo.org', async (p) => {
  await step('field-new-figure', async () => { await go(p, '/home'); await btn(p, /New figure/).click(); await shot(p, 'field-new-figure'); await esc(p) })
})

await as('jeanpaul.habimana@meridian-demo.org', async (p) => {
  await step('risk-detail', async () => { await go(p, '/risks'); await p.getByText('Civil works delayed').first().click(); await shot(p, 'risk-detail', { wait: 1500 }); await esc(p) })
  await step('activity-detail', async () => { await go(p, '/activities'); await p.getByText('Pipeline works, lot 2').first().click(); await ready(p, 1000); await shot(p, 'activity-detail') })
})

await as('director@meridian-demo.org', async (p) => {
  await step('people-invite', async () => { await go(p, '/people'); await btn(p, /Invite people/).click(); await shot(p, 'people-invite'); await esc(p) })
  await step('project-budget', async () => {
    await go(p, '/programmes/770a639a-443d-410d-8728-5c5c4ffde837/projects/19bc490c-a999-4564-b6f8-0c062e70bc6e')
    const h = p.locator('#budget'); await h.scrollIntoViewIfNeeded(); await p.waitForTimeout(800)
    await h.evaluate((el) => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 80))
    await shot(p, 'project-budget')
  })
  await step('workspace-ai', async () => {
    await go(p, '/settings/workspace'); const a = p.getByText('AI assistant').first(); await a.scrollIntoViewIfNeeded()
    await a.evaluate((el) => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 120)); await shot(p, 'workspace-ai')
  })
  await step('integrations-add', async () => { await go(p, '/settings/integrations'); await btn(p, /Add connector/).click(); await shot(p, 'integrations-add'); await esc(p) })
  await step('admin-home', async () => {
    await go(p, '/home')
    const menu = async () => { await p.locator('[data-sidebar="footer"] button').first().click(); await p.waitForTimeout(600) }
    await menu(); await p.getByRole('menuitem', { name: /Administrator/ }).first().click().catch(async () => p.getByText('Administrator').last().click())
    await ready(p, 1500); await go(p, '/home'); await shot(p, 'role-admin-home')
    await menu(); await p.getByRole('menuitem', { name: /^Director/ }).first().click().catch(async () => p.getByText('Director').last().click())
    await ready(p, 800); await menu(); await shot(p, 'user-menu'); await esc(p)
  })
})

writeFileSync(OUT + 'state.json', JSON.stringify(state, null, 2))
console.log(state)
await b.close()
