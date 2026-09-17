// Browser, sign-in and the waiting.
//
// One browser, one context per role, signed-in state cached on disk. A full
// run touches sixty pages; signing in sixty times would make the run long
// enough that nobody does it, and a manual whose screenshots are never
// recaptured is the problem this harness exists to solve.

import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

export const ROLES = {
  org_admin: { email: 'director@meridian-demo.org', label: 'Helena Achterberg, Executive Director' },
  me_officer: { email: 'nadia.qureshi@meridian-demo.org', label: 'Nadia Qureshi, Head of MEL' },
  reporter: { email: 'farhana.akter@meridian-demo.org', label: 'Farhana Akter, Field Coordinator' },
  viewer: { email: 'donor.liaison@meridian-demo.org', label: 'Margaret Lindgren, Donor Liaison' },
  anon: { email: null, label: 'signed out' },
}

// Overridable so several capture runs can work at once without fighting over
// one another's cookie jar — three of these ran in parallel while the recipes
// were being written.
const AUTH_DIR = process.env.CAPTURE_AUTH_DIR
  ? path.resolve(process.env.CAPTURE_AUTH_DIR)
  : path.join(import.meta.dirname, '..', '.auth')

/**
 * The demo instance, and only the demo instance.
 *
 * A screenshot of MZFN's indicators in a manual we hand to a different client
 * is a data breach with a page number. The check is a refusal rather than a
 * warning because the cost of getting this wrong is not recoverable.
 */
export function assertDemoHost(baseUrl, override) {
  const host = new URL(baseUrl).host
  const allowed = ['demo.impactmel.com', 'localhost:3100', 'localhost:3000', '127.0.0.1:3100']
  if (allowed.includes(host) || override) return
  throw new Error(
    `refusing to capture screenshots from ${host}.\n` +
      `Figures come from the demo instance, which holds invented data. Pass --i-know ` +
      `only if you are certain this host has no client data on it.`,
  )
}

export async function openBrowser({ headed = false } = {}) {
  return chromium.launch({
    headless: !headed,
    // Playwright's own chromium is not installed on this machine and the
    // download is 150MB of something already present. Chrome stable renders
    // the app identically; a font difference would show up immediately in the
    // first figure.
    channel: 'chrome',
    args: ['--force-color-profile=srgb', '--font-render-hinting=none', '--hide-scrollbars'],
  })
}

/**
 * A context for a role, signed in, at 2x so the images survive print.
 *
 * 1440 wide is the narrowest desktop the layout still looks composed at, and
 * the manual's text column is about 155mm — a 1440px-wide capture lands at
 * roughly 235dpi on the page, which is sharper than the press needs and
 * forgiving of a reader zooming a PDF.
 */
export async function contextForRole(browser, role, { baseUrl, fresh = false, width = 1440, height = 900 }) {
  const spec = ROLES[role]
  if (!spec) throw new Error(`unknown role '${role}'`)

  fs.mkdirSync(AUTH_DIR, { recursive: true })
  const statePath = path.join(AUTH_DIR, `${role}.json`)
  const hasState = role !== 'anon' && !fresh && fs.existsSync(statePath)

  const context = await browser.newContext({
    baseURL: baseUrl,
    viewport: { width, height },
    deviceScaleFactor: 2,
    storageState: hasState ? statePath : undefined,
    colorScheme: 'light',
    locale: 'en-GB',
    timezoneId: 'Africa/Kigali',
    reducedMotion: 'reduce',
  })

  // Clear the furniture before the page renders.
  //
  // The first trial run produced a dashboard behind a dimming overlay with
  // "STEP 1 OF 9 — Welcome to Impact MEL!" and a cookie banner on top of it.
  // Both are correct product behaviour for a first-time visitor and both are
  // useless in a manual, so the harness arrives as somebody who has already
  // seen them. Dismissing them by clicking would be slower and would leave the
  // tour's dimming layer mid-fade in some captures.
  await context.addInitScript(
    ({ tours }) => {
      try {
        localStorage.setItem('cookieConsent', 'accepted')
        for (const t of tours) localStorage.setItem(`impactmel.tour-seen.${t}`, '1')
      } catch {
        // A page served before storage is available; the next navigation sets it.
      }
    },
    { tours: ['getting-started', 'projects-tour', 'indicators-tour', 'forms-tour', 'reporter-submit-tour'] },
  )

  // No caret blink, no transitions mid-capture, no lazy image half-loaded.
  await context.addInitScript(() => {
    const style = document.createElement('style')
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        caret-color: transparent !important;
      }
      ::-webkit-scrollbar { width: 0 !important; height: 0 !important; }
    `
    const attach = () => document.head?.appendChild(style)
    if (document.head) attach()
    else document.addEventListener('DOMContentLoaded', attach)
  })

  if (role === 'anon') return context

  const page = await context.newPage()
  if (hasState) {
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' })
    if (!page.url().includes('/login')) {
      await page.close()
      return context
    }
    // The cached cookie has expired; fall through and sign in again.
  }

  await signIn(page, spec.email)
  await context.storageState({ path: statePath })
  await page.close()
  return context
}

/** The two-step form: email, Continue, password, Sign in. */
export async function signIn(page, email, password = process.env.DEMO_PASSWORD || 'Demo@12345') {
  await page.goto('/login', { waitUntil: 'domcontentloaded' })

  // The email fieldset is disabled until hydration, and a fill into a disabled
  // input silently does nothing — which showed up as "wrong password".
  const emailField = page.locator('#email')
  await emailField.waitFor({ state: 'visible', timeout: 30_000 })
  await page.waitForFunction(() => !document.querySelector('#email')?.disabled, null, { timeout: 30_000 })
  await emailField.fill(email)
  await page.getByRole('button', { name: 'Continue' }).click()

  const passwordField = page.locator('#password')
  await passwordField.waitFor({ state: 'visible', timeout: 30_000 })
  await passwordField.fill(password)
  await page.getByRole('button', { name: 'Sign in' }).click()

  await page.waitForURL((url) => !url.pathname.startsWith('/login'), { timeout: 60_000 })
  await settle(page)
}

/**
 * Wait until the screen has stopped changing.
 *
 * Network-idle alone is not enough: this app renders skeletons while a second
 * wave of requests runs, and a screenshot of a pulsing grey block is worse
 * than no screenshot because it looks deliberate. So: idle, then no skeletons,
 * then fonts, then two quiet animation frames.
 */
export async function settle(page, { timeout = 30_000 } = {}) {
  await page.waitForLoadState('domcontentloaded')
  await page.waitForLoadState('networkidle', { timeout }).catch(() => {})

  await page
    .waitForFunction(
      () => {
        const pulsing = document.querySelectorAll('.animate-pulse, [data-loading="true"], [aria-busy="true"]')
        for (const el of pulsing) {
          const r = el.getBoundingClientRect()
          if (r.width > 24 && r.height > 8) return false
        }
        return true
      },
      null,
      { timeout: 15_000 },
    )
    .catch(() => {})

  await clearOverlays(page)
  await numbersStopMoving(page)

  await page.evaluate(() => document.fonts?.ready)
  await page.evaluate(
    () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  )
}

/**
 * Wait until the counters have finished counting.
 *
 * Three runs of the dashboard figure produced 96, 92 and 134 in the
 * "Submissions Approved" tile while the line underneath it said "153 of 172"
 * every time — which read like the tile disagreeing with itself, and is worth
 * the paragraph because I nearly filed it as a product bug. It is a count-up
 * animation: the tile animates from zero and the screenshot caught it in
 * flight. Disabling CSS animations does nothing to a number driven by
 * requestAnimationFrame, and `reducedMotion` is only honoured where someone
 * checked for it.
 *
 * So: sample the digits on the page until two consecutive samples match.
 */
export async function numbersStopMoving(page, { timeout = 8_000, interval = 160 } = {}) {
  const digits = () =>
    page
      .evaluate(() => (document.querySelector('main') ?? document.body).innerText.replace(/\D+/g, '').slice(0, 4000))
      .catch(() => null)

  const deadline = Date.now() + timeout
  let previous = await digits()
  while (Date.now() < deadline) {
    await page.waitForTimeout(interval)
    const current = await digits()
    if (current !== null && current === previous) return true
    previous = current
  }
  return false
}

/**
 * Close anything that arrived over the top of the page anyway.
 *
 * The localStorage flags stop the tour and the cookie banner from appearing at
 * all, which is the reliable fix. This is the second line: a toast that fires
 * on load, or a banner whose flag the product later renames. It is deliberately
 * narrow — it must never close a dialog a recipe just opened on purpose, so it
 * matches the cookie banner by its text and the tour by its own controls, and
 * touches nothing else.
 */
export async function clearOverlays(page) {
  const cookie = page.getByText('This site uses cookies')
  if (await cookie.count()) {
    await page.getByRole('button', { name: /accept cookies|dismiss/i }).first().click().catch(() => {})
  }

  const tour = page.getByText(/^step \d+ of \d+$/i)
  if (await tour.count()) {
    await page.keyboard.press('Escape').catch(() => {})
    await page.waitForTimeout(120)
  }

  // The demo instance carries a platform announcement across the top of every
  // page — "Demonstration data: … Meridian Impact Alliance is not a real
  // organisation" — which is exactly right for a prospect clicking around the
  // demo and exactly wrong in a manual shipped to a client whose instance has
  // no such banner. Dismissed through the product's own button, so this cannot
  // hide anything the product would not let a reader hide.
  const banners = page.locator(
    '.bg-amber-500 > button[aria-label="Dismiss"], .bg-red-600 > button[aria-label="Dismiss"], ' +
      '.bg-blue-600 > button[aria-label="Dismiss"], .bg-emerald-600 > button[aria-label="Dismiss"]',
  )
  for (let i = await banners.count(); i > 0; i--) {
    await banners.first().click({ timeout: 2_000 }).catch(() => {})
  }

  // Sonner/radix toasts stack bottom-right and photograph as clutter.
  await page
    .evaluate(() => {
      for (const el of document.querySelectorAll('[data-sonner-toaster], [role="status"][data-state="open"]')) {
        el.remove()
      }
    })
    .catch(() => {})
}

/** GET a JSON endpoint as the signed-in user, from inside the page. */
export async function apiGet(page, endpoint) {
  const res = await page.evaluate(async (e) => {
    const r = await fetch(`/api${e}`, { credentials: 'include' })
    return { ok: r.ok, status: r.status, body: r.ok ? await r.json() : await r.text() }
  }, endpoint)
  if (!res.ok) throw new Error(`GET /api${endpoint} → ${res.status}: ${String(res.body).slice(0, 200)}`)
  return res.body
}
