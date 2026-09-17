// Chapters 9–13: reusing an indicator, entering data, review and approve,
// period sign-off, activities and participants.
//
// The hardest figures in the manual, because most of them are a dialog with a
// field filled in rather than a page. Two rules hold throughout:
//
//   - a dialog is opened, filled and photographed, and the confirming button
//     is never clicked. Closing a reporting period on the demo would refuse
//     every figure the rest of the manual needs, and "Reject" would throw away
//     a submission somebody's screenshot depends on;
//   - anything typed into a field is plausible sentence, not "test" — the
//     reader is looking at an example of how to write a reason, and "asdf"
//     teaches them nothing.

import { centre, unionOf, grow } from '../lib/regions.mjs'
import { apiGet } from '../lib/browser.mjs'

/** The review queue's first expandable row, opened. */
async function expandFirstReviewRow(page) {
  const row = page.getByRole('button', { name: /decisions so far|expand|details/i }).first()
  if (await row.count()) {
    await row.click().catch(() => {})
    await page.waitForTimeout(300)
  }
}

export default [
  // ── 9 · Reusing an indicator ────────────────────────────────────────────
  {
    key: 'indicator-picker',
    chapter: 9,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/projects/${w.projectId}/indicators/new`,
    clip: async (page) =>
      grow(
        await unionOf(page, page.getByText(/already measuring this somewhere/i).locator('xpath=ancestor::*[self::div][2]')),
        16,
        page.viewportSize(),
      ),
    async prepare(page) {
      const search = page.getByPlaceholder(/search|measuring/i).first()
      await search.waitFor({ state: 'visible', timeout: 20_000 })
      // A term the demo definitely holds, so the result list is not empty.
      await search.fill('households')
      await page.waitForTimeout(1200)
      const first = page.getByRole('button', { name: /use this definition/i }).first()
      if (!(await first.count())) {
        // Results are rows that reveal the two choices once selected.
        await page.locator('[role="option"], li, [data-result]').first().click().catch(() => {})
        await page.waitForTimeout(500)
      }
      await centre(page, 'text=/already measuring this somewhere/i')
    },
  },
  {
    key: 'indicator-use-elsewhere',
    chapter: 9,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/projects/${w.projectId}/indicators/${w.indicatorId}`,
    clip: 'dialog',
    async prepare(page) {
      const button = page.getByRole('button', { name: /use in another project|measure this in another/i }).first()
      await button.waitFor({ state: 'visible', timeout: 20_000 })
      await button.click()
      const dialog = page.locator('[role="dialog"]')
      await dialog.waitFor({ state: 'visible', timeout: 20_000 })
      // Choose a project so the dialog shows its second step.
      const select = dialog.locator('select').first()
      if (await select.count()) {
        const options = await select.locator('option').all()
        if (options.length > 1) await select.selectOption({ index: 1 })
        await page.waitForTimeout(600)
      }
    },
  },

  // ── 10 · Entering data ──────────────────────────────────────────────────
  {
    key: 'progress-reports',
    chapter: 10,
    as: 'reporter',
    url: (w) => `/org/${w.orgId}/projects/${w.projectId}/indicator-reports`,
    clip: 'main',
    maxHeight: 1400,
    async prepare(page) {
      const expand = page.getByRole('button', { name: /expand|show|enter/i }).first()
      if (await expand.count()) await expand.click().catch(() => {})
      await page.waitForTimeout(400)
    },
  },
  {
    key: 'bulk-import-template',
    chapter: 10,
    as: 'reporter',
    url: (w) => `/org/${w.orgId}/projects/${w.projectId}/indicator-reports/bulk-import`,
    clip: 'main',
    maxHeight: 1100,
  },
  {
    key: 'submissions-overview',
    chapter: 10,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/submissions`,
    clip: 'main',
    maxHeight: 1200,
  },
  {
    key: 'submission-expanded',
    chapter: 10,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/submissions`,
    clip: 'main',
    maxHeight: 1800,
    async prepare(page) {
      // Open a card, then make sure the Decision Log the caption promises is
      // actually on screen before the shot.
      const card = page.locator('[data-submission-card], article, [role="button"]').first()
      await card.click().catch(() => {})
      await page.waitForTimeout(800)
      if (!(await page.getByText(/decision log/i).count())) {
        await page.getByText(/submitted|in review/i).first().click().catch(() => {})
        await page.waitForTimeout(800)
      }
      await centre(page, 'text=/decision log/i').catch(() => {})
    },
  },

  // ── 11 · Review and approve ─────────────────────────────────────────────
  {
    key: 'review-queue',
    chapter: 11,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/review`,
    clip: 'main',
    maxHeight: 1400,
  },
  {
    key: 'review-approval-chain',
    chapter: 11,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/review`,
    clip: 'main',
    maxHeight: 1200,
    async prepare(page) {
      await expandFirstReviewRow(page)
      const badge = page.getByText(/\d+ of \d+ approved/i).first()
      if (!(await badge.count())) {
        throw new Error(
          'no submission on the demo is part-way through a two-approver chain, so "1 of 2 approved" cannot be shown',
        )
      }
      await centre(page, badge)
    },
  },
  {
    key: 'review-send-back',
    chapter: 11,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/review`,
    clip: 'dialog',
    async prepare(page) {
      const button = page.getByRole('button', { name: /send back/i }).first()
      await button.waitFor({ state: 'visible', timeout: 20_000 })
      await button.click()
      const dialog = page.locator('[role="dialog"]')
      await dialog.waitFor({ state: 'visible', timeout: 20_000 })
      await dialog
        .locator('textarea, input[type="text"]')
        .first()
        .fill('The August figure looks like July’s — please check the register and resubmit.')
      // Never click Send back: it would return a submission the rest of the
      // manual's figures are taken from.
    },
  },
  {
    key: 'review-ask-someone',
    chapter: 11,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/review`,
    clip: 'dialog',
    async prepare(page) {
      const button = page.getByRole('button', { name: /ask someone/i }).first()
      await button.waitFor({ state: 'visible', timeout: 20_000 })
      await button.click()
      const dialog = page.locator('[role="dialog"]')
      await dialog.waitFor({ state: 'visible', timeout: 20_000 })
      const select = dialog.locator('select').first()
      if (await select.count()) {
        const options = await select.locator('option').all()
        if (options.length > 1) await select.selectOption({ index: 1 })
      }
      const note = dialog.locator('textarea').first()
      if (await note.count()) {
        await note.fill('Could you look at the denominator here before I approve it?')
      }
    },
  },

  // ── 12 · Period sign-off ────────────────────────────────────────────────
  {
    key: 'period-signoff-outstanding',
    chapter: 12,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/periods`,
    clip: async (page) =>
      grow(
        await unionOf(page, page.getByText(/still outstanding|outstanding/i).first().locator('xpath=ancestor::*[self::div][3]')),
        14,
        page.viewportSize(),
      ),
    async prepare(page) {
      await centre(page, 'text=/outstanding/i').catch(() => {})
    },
  },
  {
    key: 'period-signoff-close-confirm',
    chapter: 12,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/periods`,
    clip: 'dialog',
    async prepare(page) {
      const button = page.getByRole('button', { name: /close the period/i }).first()
      await button.waitFor({ state: 'visible', timeout: 20_000 })
      await button.click()
      await page.locator('[role="dialog"]').waitFor({ state: 'visible', timeout: 20_000 })
      // The confirming button is deliberately not clicked: a closed period
      // refuses the data entry every other chapter's figures rely on.
    },
  },
  {
    key: 'period-signoff-reopen',
    chapter: 12,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/periods`,
    clip: 'dialog',
    async prepare(page) {
      const button = page.getByRole('button', { name: /^reopen$/i }).first()
      if (!(await button.count())) {
        throw new Error('no closed period on the demo, so Reopen cannot be shown')
      }
      await button.click()
      const dialog = page.locator('[role="dialog"]')
      await dialog.waitFor({ state: 'visible', timeout: 20_000 })
      await dialog
        .locator('textarea, input[type="text"]')
        .first()
        .fill('The clinic figures for March arrived after we closed.')
    },
  },

  // ── 13 · Activities and participants ────────────────────────────────────
  {
    key: 'activities-list',
    chapter: 13,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/projects/${w.projectId}/activities`,
    clip: 'main',
    maxHeight: 1300,
  },
  {
    key: 'new-activity',
    chapter: 13,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/projects/${w.projectId}/activities/new`,
    clip: 'main',
    maxHeight: 1400,
  },
  {
    key: 'activity-detail',
    chapter: 13,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/projects/${w.projectId}/activities/${w.activityId}`,
    clip: 'main',
    maxHeight: 1500,
  },
  {
    key: 'activity-participants',
    chapter: 13,
    as: 'reporter',
    url: (w) => `/org/${w.orgId}/projects/${w.projectId}/activities/${w.activityId}/participants`,
    clip: 'main',
    maxHeight: 1200,
    async prepare(page, w) {
      // The reporter may not manage the project the officer's world picked, in
      // which case this page is a refusal. Fall back to a project they can see.
      if (await page.getByText(/not found|no access|cannot/i).count()) {
        const projects = await apiGet(page, '/projects')
        if (projects.length) {
          const activities = await apiGet(page, `/activities?projectId=${projects[0].id}`)
          if (activities.length) {
            await page.goto(
              `/org/${w.orgId}/projects/${projects[0].id}/activities/${activities[0].id}/participants`,
              { waitUntil: 'domcontentloaded' },
            )
            await page.waitForTimeout(1200)
          }
        }
      }
      // The Status dropdown open on Registered / Attended / Absent.
      const status = page.locator('select').first()
      if (await status.count()) await status.click().catch(() => {})
    },
  },
  {
    key: 'participant-register-new',
    chapter: 13,
    as: 'reporter',
    url: (w) => `/org/${w.orgId}/participants/new`,
    clip: 'main',
    maxHeight: 1400,
    async prepare(page) {
      // One household member added, as the caption promises.
      const add = page.getByRole('button', { name: /add (a )?household member|add member/i }).first()
      if (await add.count()) {
        await add.click().catch(() => {})
        await page.waitForTimeout(400)
      }
    },
  },
]
