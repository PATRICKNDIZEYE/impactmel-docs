// Shared helpers for capturing v2 screens from demo.impactmel.com.
import { chromium } from '/Users/ndizeye/Documents/Desktop/Impactmel/video-studio/node_modules/playwright/index.mjs'

export const BASE = process.env.DEMO_URL || 'https://demo.impactmel.com'
export const PASSWORD = process.env.DEMO_PASSWORD || 'Demo@12345'
export const WIDTH = 1440
export const HEIGHT = 900

export async function launch() {
  return chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
  })
}

export async function context(browser, opts = {}) {
  return browser.newContext({
    viewport: { width: opts.width || WIDTH, height: opts.height || HEIGHT },
    deviceScaleFactor: 2,
    colorScheme: 'light',
    locale: 'en-GB',
    timezoneId: 'Africa/Kigali',
    ...opts.extra,
  })
}

export async function login(page, email) {
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' })
  await page.locator('input[type="email"], input[name="email"]').first().fill(email)
  await page.getByRole('button', { name: /continue/i }).first().click()
  const pw = page.locator('input[type="password"]').first()
  await pw.waitFor({ timeout: 20000 })
  await pw.fill(PASSWORD)
  await page.getByRole('button', { name: /sign in|continue/i }).first().click()
  await page.waitForURL((u) => !/\/login/.test(u.pathname), { timeout: 30000 })
  await settle(page)
}

export async function settle(page, ms = 1200) {
  await page.waitForLoadState('networkidle').catch(() => {})
  await page.waitForTimeout(ms)
}

// Wait until skeletons and "Loading" placeholders are gone.
export async function ready(page, extra = 800) {
  await page.waitForLoadState('networkidle').catch(() => {})
  await page.waitForFunction(() => {
    const busy = document.querySelectorAll('[data-slot="skeleton"], .animate-pulse').length
    const m = document.querySelector('main')
    const loading = m && /(^|\n)\s*Loading\b/.test(m.innerText)
    return !busy && !loading
  }, null, { timeout: 25000 }).catch(() => console.warn('  ready: timed out on', page.url()))
  await page.addStyleTag({ content: 'nextjs-portal{display:none!important}' }).catch(() => {})
  await page.waitForTimeout(extra)
}
