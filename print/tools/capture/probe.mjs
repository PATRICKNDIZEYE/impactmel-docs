// Ad-hoc probe: sign in as a role and print what an endpoint returns.
//
//   node probe.mjs me_officer /projects
//   node probe.mjs org_admin /reports/indicator-register --keys
//
// Kept in the repo because every recipe that broke so far broke over the shape
// of a response, and guessing at it from the frontend source is slower than
// asking the instance.

import { openBrowser, contextForRole, apiGet, assertDemoHost } from './lib/browser.mjs'

const [role = 'me_officer', endpoint = '/projects', ...flags] = process.argv.slice(2)
const baseUrl = process.env.CAPTURE_BASE_URL || 'https://demo.impactmel.com'
assertDemoHost(baseUrl, flags.includes('--i-know'))

const browser = await openBrowser()
const context = await contextForRole(browser, role, { baseUrl, fresh: flags.includes('--fresh-auth') })
const page = await context.newPage()
await page.goto('/dashboard', { waitUntil: 'domcontentloaded' })

const body = await apiGet(page, endpoint)
const sample = Array.isArray(body) ? body[0] : body

if (flags.includes('--keys')) {
  console.log(Array.isArray(body) ? `array of ${body.length}` : 'object')
  console.log(Object.keys(sample ?? {}).join(', '))
} else {
  console.log(JSON.stringify(Array.isArray(body) ? body.slice(0, 3) : body, null, 1).slice(0, 4000))
  if (Array.isArray(body)) console.log(`… ${body.length} items`)
}

await browser.close()
