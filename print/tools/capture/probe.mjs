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
