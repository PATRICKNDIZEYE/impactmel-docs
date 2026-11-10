// Page-level captures: one login per person, then plain navigations.
import { launch, context, login, ready, BASE } from './lib.mjs'
import { mkdirSync } from 'node:fs'
const OUT = new URL('./out/', import.meta.url).pathname
mkdirSync(OUT, { recursive: true })

const PG = '/programmes/770a639a-443d-410d-8728-5c5c4ffde837'
const PJ = PG + '/projects/19bc490c-a999-4564-b6f8-0c062e70bc6e'

const PLAN = {
  'director@meridian-demo.org': [
    ['role-director-home', '/home'],
    ['programmes-list', '/programmes'],
    ['programme-page', PG],
    ['project-page', PJ],
    ['locations-map', '/locations'],
    ['reports-list', '/reports'],
    ['people', '/people'],
    ['roles-permissions', '/settings/roles'],
    ['workspace-settings', '/settings/workspace'],
    ['activity-log', '/settings/activity'],
    ['integrations', '/settings/integrations'],
    ['billing', '/billing'],
    ['security-settings', '/settings/security'],
  ],
  'adaeze.okafor@meridian-demo.org': [
    ['role-me-home', '/home'],
    ['framework', '/framework'],
    ['indicators-list', '/indicators'],
    ['review-queue', '/review'],
    ['forms-list', '/forms'],
    ['participants', '/participants'],
    ['analysis', '/analysis'],
  ],
  'jeanpaul.habimana@meridian-demo.org': [
    ['role-pm-home', '/home'],
    ['activities', '/activities'],
    ['deadlines', '/deadlines'],
    ['risks', '/risks'],
  ],
  'clarisse.uwase@meridian-demo.org': [
    ['role-field-home', '/home'],
    ['field-sent', '/sent'],
  ],
  'finance@meridian-demo.org': [['role-finance-home', '/home']],
  'donor.liaison@meridian-demo.org': [['role-viewer-home', '/home']],
}

const only = process.argv[2]
const b = await launch()
for (const [email, shots] of Object.entries(PLAN)) {
  if (only && !shots.some(([n]) => n.startsWith(only)) && !email.startsWith(only)) continue
  const c = await context(b); const p = await c.newPage()
  await login(p, email)
  for (const [name, path] of shots) {
    if (only && !name.startsWith(only) && !email.startsWith(only)) continue
    try {
      await p.goto(BASE + path, { waitUntil: 'domcontentloaded' })
      await ready(p, 1200)
      await hideSeatCounts(p)
      await p.screenshot({ path: OUT + name + '.png' })
      console.log('ok', name)
    } catch (e) { console.log('FAIL', name, e.message.split('\n')[0]) }
  }
  await c.close()
}
await b.close()

// Seat counts are never shown in customer-facing material.
export async function hideSeatCounts(p) {
  await p.evaluate(() => {
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    const hits = []
    while (walk.nextNode()) if (/\b\d+ of \d+ users\b/i.test(walk.currentNode.textContent)) hits.push(walk.currentNode.parentElement)
    hits.forEach((el) => (el.style.visibility = 'hidden'))
  })
}
