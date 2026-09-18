import { centre, unionOf, grow } from '../lib/regions.mjs'
import { apiGet } from '../lib/browser.mjs'

/** A published form with responses, or the first form there is. */
async function goToUsableForm(page, w) {
  const forms = await apiGet(page, '/forms')
  if (!forms.length) throw new Error('the demo holds no forms')
  const published = forms.find((f) => f.status === 'published' || f.isPublished) ?? forms[0]
  await page.goto(`/org/${w.orgId}/forms/${published.id}`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(1500)
  return published
}

export default [
  // ── 14 · Forms ──────────────────────────────────────────────────────────
  {
    key: 'forms-list',
    chapter: 14,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/forms`,
    clip: 'main',
    maxHeight: 1200,
  },
  {
    key: 'form-builder',
    chapter: 14,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/forms/${w.formId}`,
    clip: 'main',
    maxHeight: 1500,
    prepare: goToUsableForm,
  },
  {
    key: 'form-field-inspector',
    chapter: 14,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/forms/${w.formId}`,
    clip: async (page) =>
      grow(
        await unionOf(page, page.getByText(/edit field/i).first().locator('xpath=ancestor::*[self::div][2]')),
        14,
        page.viewportSize(),
      ),
    async prepare(page, w) {
      await goToUsableForm(page, w)
      // A single-choice field, so the Choices list is part of the picture.
      const choiceField = page.getByText(/single choice/i).first()
      if (await choiceField.count()) {
        await choiceField.click().catch(() => {})
      } else {
        await page.locator('[data-field], [draggable="true"]').first().click().catch(() => {})
      }
      await page.waitForTimeout(600)
      await centre(page, 'text=/edit field/i').catch(() => {})
    },
  },
  {
    key: 'form-share',
    chapter: 14,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/forms/${w.formId}`,
    clip: async (page) =>
      grow(
        await unionOf(page, page.getByText(/share this form/i).first().locator('xpath=ancestor::*[self::div][2]')),
        14,
        page.viewportSize(),
      ),
    async prepare(page, w) {
      await goToUsableForm(page, w)
      if (!(await page.getByText(/share this form/i).count())) {
        throw new Error('no published form on the demo, so the share banner is not shown')
      }
      await centre(page, 'text=/share this form/i')
    },
  },
  {
    key: 'form-responses',
    chapter: 14,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/forms/${w.formId}/responses`,
    clip: 'main',
    maxHeight: 1300,
    async prepare(page, w) {
      const form = await goToUsableForm(page, w)
      await page.goto(`/org/${w.orgId}/forms/${form.id}/responses`, { waitUntil: 'domcontentloaded' })
      await page.waitForTimeout(1500)
      // One response selected, so the right pane is not empty.
      const row = page.locator('tbody tr, [role="row"], [data-response]').first()
      await row.click().catch(() => {})
      await page.waitForTimeout(600)
    },
  },

  // ── 15 · Reports ────────────────────────────────────────────────────────
  {
    key: 'reports-list',
    chapter: 15,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/reports`,
    clip: 'main',
    maxHeight: 1200,
    async prepare(page, w) {
      const reports = await apiGet(page, '/reports/org').catch(() => [])
      if (!reports.length) {
        throw new Error(
          'the demo holds no saved reports, so the list has nothing in it — seed some before capturing this',
        )
      }
    },
  },
  {
    key: 'report-wizard-type',
    chapter: 15,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/reports/new`,
    clip: 'main',
    maxHeight: 1300,
  },
  {
    key: 'report-wizard-scope',
    chapter: 15,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/reports/new`,
    clip: 'main',
    maxHeight: 1300,
    async prepare(page) {
      // Pick a type to reach step 2, then choose consecutive periods so the
      // confirmation line the caption mentions appears.
      await page.locator('[role="button"], button').filter({ hasText: /progress|portfolio|donor/i }).first().click()
      await page.waitForTimeout(800)
      const next = page.getByRole('button', { name: /next|continue/i }).first()
      if (await next.count()) await next.click().catch(() => {})
      await page.waitForTimeout(800)
      const boxes = page.locator('input[type="checkbox"]')
      const count = await boxes.count()
      for (let i = 0; i < Math.min(2, count); i++) await boxes.nth(i).check().catch(() => {})
      await page.waitForTimeout(400)
    },
  },
  {
    key: 'report-view',
    chapter: 15,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/reports`,
    clip: 'main',
    maxHeight: 1800,
    async prepare(page, w) {
      const reports = await apiGet(page, '/reports/org').catch(() => [])
      if (!reports.length) throw new Error('the demo holds no saved reports to open')
      await page.goto(`/org/${w.orgId}/reports/${reports[0].id}`, { waitUntil: 'domcontentloaded' })
      await page.waitForTimeout(2000)
    },
  },
  {
    key: 'report-share',
    chapter: 15,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/reports`,
    // Once a link exists the dialog's own box stays 336px while its contents
    // run to 521px, so Copy link and half the address sit outside it. An
    // element screenshot of the dialog cuts them off; union the dialog with the
    // controls to photograph what is actually on screen.
    clip: async (page) =>
      grow(
        await unionOf(
          page,
          page.locator('[role="dialog"], [role="alertdialog"]'),
          page.locator('[role="dialog"] button, [role="alertdialog"] button'),
          page.locator('[role="dialog"] input, [role="alertdialog"] input'),
        ),
        14,
        page.viewportSize(),
      ),
    async prepare(page, w) {
      const reports = await apiGet(page, '/reports/org').catch(() => [])
      if (!reports.length) throw new Error('the demo holds no saved reports to share')
      await page.goto(`/org/${w.orgId}/reports/${reports[0].id}`, { waitUntil: 'domcontentloaded' })
      await page.waitForTimeout(2000)
      const share = page.getByRole('button', { name: /^share/i }).first()
      await share.waitFor({ state: 'visible', timeout: 20_000 })
      await share.click()
      const dialog = page.locator('[role="dialog"], [role="alertdialog"]')
      await dialog.waitFor({ state: 'visible', timeout: 20_000 })

      // The dialog opens on "No share link has been generated yet", which is
      // the state before the step the caption describes. Generate one, so the
      // figure shows the address, Copy link and Regenerate link.
      const generate = dialog.getByRole('button', { name: /generate share link/i })
      if (await generate.count()) {
        await generate.first().click()
        await dialog.getByRole('button', { name: /copy link/i }).waitFor({ state: 'visible', timeout: 20_000 })
      }
    },
  },

  // ── 16 · Indicator register and tracking table ──────────────────────────
  {
    key: 'indicator-register',
    chapter: 16,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/reports/overview`,
    clip: 'main',
    maxHeight: 1600,
  },
  {
    key: 'tracking-table',
    chapter: 16,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/reports/pitt`,
    // The table is wider than it is tall and the grouped rows are the point,
    // so this is a landscape crop of the grid rather than a squeezed page.
    clip: 'main',
    maxHeight: 1100,
  },

  // ── 20 · Roles and permissions ──────────────────────────────────────────
  {
    key: 'members-roles',
    chapter: 20,
    as: 'org_admin',
    url: (w) => `/org/${w.orgId}/settings/members`,
    clip: async (page) =>
      grow(await unionOf(page, page.locator('tbody tr').first(), page.locator('tbody tr').nth(2)), 16, page.viewportSize()),
    async prepare(page) {
      await centre(page, 'tbody tr')
    },
  },

  // ── 21 · Settings and administration ────────────────────────────────────
  {
    key: 'settings-organization',
    chapter: 21,
    as: 'org_admin',
    url: (w) => `/org/${w.orgId}/settings`,
    clip: 'main',
    maxHeight: 1500,
  },
  {
    key: 'settings-members',
    chapter: 21,
    as: 'org_admin',
    url: (w) => `/org/${w.orgId}/settings/members`,
    clip: 'main',
    maxHeight: 1800,
  },
  {
    key: 'settings-reporting-periods',
    chapter: 21,
    as: 'org_admin',
    url: (w) => `/org/${w.orgId}/settings/reporting-periods`,
    clip: 'main',
    maxHeight: 1500,
  },
  {
    key: 'settings-disaggregations',
    chapter: 21,
    as: 'org_admin',
    url: (w) => `/org/${w.orgId}/settings/disaggregations`,
    clip: 'main',
    maxHeight: 1400,
    async prepare(page) {
      // One dimension expanded, showing its values and the bulk add box.
      const first = page.getByRole('button', { name: /gender|expand|values/i }).first()
      if (await first.count()) await first.click().catch(() => {})
      await page.waitForTimeout(500)
    },
  },
  {
    key: 'settings-export',
    chapter: 21,
    as: 'org_admin',
    url: (w) => `/org/${w.orgId}/settings/export`,
    clip: 'main',
    maxHeight: 1300,
    async prepare(page) {
      // Two data sets ticked and XLSX chosen — filled in, never submitted.
      const boxes = page.locator('input[type="checkbox"]')
      const count = await boxes.count()
      for (let i = 0; i < Math.min(2, count); i++) await boxes.nth(i).check().catch(() => {})
      const xlsx = page.getByText(/xlsx/i).first()
      if (await xlsx.count()) await xlsx.click().catch(() => {})
      await page.waitForTimeout(300)
    },
  },
  {
    key: 'settings-audit-log',
    chapter: 21,
    as: 'org_admin',
    url: (w) => `/org/${w.orgId}/settings/audit-log`,
    clip: 'main',
    maxHeight: 1500,
    async prepare(page) {
      const row = page.locator('tbody tr, [role="row"]').first()
      await row.click().catch(() => {})
      await page.waitForTimeout(500)
    },
  },
]
