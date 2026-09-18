import { centre } from '../lib/regions.mjs'

/** Switch a tabbed page and wait for the new panel to settle. */
async function openTab(page, name) {
  const tab = page.getByRole('tab', { name })
  if (await tab.count()) await tab.first().click()
  else await page.getByText(name, { exact: true }).first().click()
  await page.waitForTimeout(2500)
}

export default [
  // ── 17 · Analysis ───────────────────────────────────────────────────────
  {
    key: 'visualization',
    chapter: 17,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/visualization`,
    clip: 'main',
    maxHeight: 1500,
    // ECharts animates in, and the gauge counts up to its value.
    settleExtra: 2500,
  },
  {
    key: 'dashboards',
    chapter: 17,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/dashboards`,
    clip: 'main',
    maxHeight: 1100,
  },
  {
    key: 'ai-insights',
    chapter: 17,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/ai-insights`,
    clip: 'main',
    maxHeight: 1400,
    settleExtra: 2000,
  },
  {
    key: 'geographic-map',
    chapter: 17,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/map`,
    clip: 'main',
    maxHeight: 1500,
    // Leaflet fetches its tiles after the page is otherwise idle; a shot taken
    // too early is a grey rectangle where the map should be.
    settleExtra: 5000,
  },

  // ── 18 · Risks ──────────────────────────────────────────────────────────
  {
    key: 'risks-org',
    chapter: 18,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/risks`,
    clip: 'main',
    maxHeight: 1500,
  },
  {
    key: 'risk-form',
    chapter: 18,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/projects/${w.projectId}/risks`,
    clip: 'dialog',
    async prepare(page) {
      await page.getByRole('button', { name: /add risk/i }).first().click()
      const dialog = page.locator('[role="dialog"]')
      await dialog.waitFor({ state: 'visible', timeout: 20_000 })

      // A blank form photographs as a column of empty boxes. Fill the fields the
      // caption names, and pick a rating either side of the default 3×3 so the
      // score pill underneath reads something other than its starting value.
      await dialog.locator('input').first().fill('R-05')
      await dialog.getByPlaceholder(/e\.g\. Delayed release/i).fill('Fuel price rise puts field visits out of budget')
      await dialog
        .getByPlaceholder(/What the team does now/i)
        .fill('Quarterly visit plan costed at the current price, with two sites covered by phone.')
      // Scope to each row's radiogroup: "Likely" also matches "Unlikely", and
      // the two rows share the numbers 1–5.
      await dialog.getByRole('radiogroup', { name: 'Likelihood' }).getByRole('radio').nth(3).click()
      await dialog.getByRole('radiogroup', { name: 'Impact' }).getByRole('radio').nth(3).click()
      await page.waitForTimeout(300)
    },
  },

  // ── 19 · Data Hub ───────────────────────────────────────────────────────
  {
    key: 'data-hub',
    chapter: 19,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/data-hub`,
    clip: 'main',
    maxHeight: 1500,
  },
  {
    key: 'data-hub-explorer',
    chapter: 19,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/data-hub`,
    clip: 'main',
    maxHeight: 1500,
    async prepare(page) {
      await openTab(page, 'Indicator Explorer')
      await centre(page, 'text=/target vs actual by period/i')
    },
  },
  {
    key: 'data-hub-quality',
    chapter: 19,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/data-hub`,
    clip: 'main',
    maxHeight: 1500,
    async prepare(page) {
      await openTab(page, 'Quality Scorecard')
      await centre(page, 'text=/organization data health/i')
    },
  },
]
