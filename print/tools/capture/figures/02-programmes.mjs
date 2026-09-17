// Chapters 4–8: programmes, the programme page, projects, the results
// framework, indicators.
//
// The through-line of these chapters is one project, so every figure that can
// use `world.projectId` does. Two figures of "the same project" showing
// different projects is the kind of thing a reader notices and we would not.

import { centre, unionOf, grow } from '../lib/regions.mjs'
import { apiGet } from '../lib/browser.mjs'

/**
 * Walk the demo's projects until one shows (or does not show) the framework
 * chooser, and stay there.
 *
 * The chosen project turned out to have no results framework at all, so the
 * "a built results chain" figure quietly captured the chooser instead — two
 * different figures, byte-for-byte the same picture. Each of the pair now
 * looks for the state its own caption describes and fails loudly if the demo
 * has no project in it.
 */
async function goToProjectWhereChooser(page, w, { shown }) {
  const chooser = () => page.getByText(/choose your framework structure/i).count()
  const path = (id) => `/org/${w.orgId}/projects/${id}/result-framework`

  if ((await chooser() > 0) === shown) return

  const projects = await apiGet(page, '/projects')
  for (const project of projects) {
    if (project.id === w.projectId) continue
    await page.goto(path(project.id), { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(1400)
    if ((await chooser() > 0) === shown) return
  }
  throw new Error(
    shown
      ? 'every demo project already has a results framework, so the chooser cannot be shown'
      : 'no demo project has a results framework built, so there is no chain to photograph',
  )
}

/** Expand the first programme row that has projects under it. */
async function expandFirstProgramme(page) {
  const row = page.getByRole('button', { name: /expand|show projects/i }).first()
  if (await row.count()) {
    await row.click()
    return
  }
  // The row itself is the control on this list; clicking the name opens it.
  await page.locator('[data-programme-row], tbody tr, [role="row"]').first().click({ trial: true }).catch(() => {})
}

export default [
  // ── 4 · Programmes ──────────────────────────────────────────────────────
  {
    key: 'programmes-list',
    chapter: 4,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/projects`,
    clip: 'main',
    maxHeight: 1200,
    prepare: expandFirstProgramme,
  },
  {
    key: 'new-programme-form',
    chapter: 4,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/projects/new`,
    clip: 'main',
    maxHeight: 1400,
  },
  {
    key: 'duplicate-programme',
    chapter: 4,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/projects`,
    clip: 'dialog',
    async prepare(page) {
      // "Start a programme from this one" lives behind a copy control on the row.
      const copy = page.getByRole('button', { name: /duplicate|copy|start (a )?programme from/i }).first()
      await copy.waitFor({ state: 'visible', timeout: 20_000 })
      await copy.click()
      await page.locator('[role="dialog"]').waitFor({ state: 'visible', timeout: 20_000 })
    },
  },

  // ── 5 · A programme's page ──────────────────────────────────────────────
  {
    key: 'programme-page',
    chapter: 5,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/projects/programs/${w.programId}`,
    clip: 'main',
    maxHeight: 1800,
  },

  // ── 6 · Projects ────────────────────────────────────────────────────────
  {
    key: 'new-project-form',
    chapter: 6,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/projects/new-project`,
    clip: 'main',
    maxHeight: 1300,
  },
  {
    key: 'project-hero',
    chapter: 6,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/projects/${w.projectId}`,
    clip: 'main',
    maxHeight: 1100,
  },
  {
    key: 'project-periods',
    chapter: 6,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/projects/${w.projectId}/periods`,
    clip: 'main',
    maxHeight: 1300,
    async prepare(page) {
      // One indicator expanded, so the period rows and Quick Generate show.
      const first = page.getByRole('button', { name: /expand|periods|generate/i }).first()
      if (await first.count()) await first.click().catch(() => {})
    },
  },
  {
    key: 'project-duplicate',
    chapter: 6,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/projects/${w.projectId}`,
    clip: 'dialog',
    async prepare(page) {
      const button = page.getByRole('button', { name: /duplicate/i }).first()
      await button.waitFor({ state: 'visible', timeout: 20_000 })
      await button.click()
      await page.locator('[role="dialog"]').waitFor({ state: 'visible', timeout: 20_000 })
    },
  },

  // ── 7 · Results framework ───────────────────────────────────────────────
  {
    key: 'framework-chooser',
    chapter: 7,
    as: 'me_officer',
    // The chooser only appears on a project that has no framework yet, which
    // the chosen project almost certainly has — so this one goes looking.
    url: (w) => `/org/${w.orgId}/projects/${w.projectId}/result-framework`,
    clip: 'main',
    maxHeight: 1000,
    prepare: (page, w) => goToProjectWhereChooser(page, w, { shown: true }),
  },
  {
    key: 'framework-tree',
    chapter: 7,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/projects/${w.projectId}/result-framework`,
    clip: 'main',
    maxHeight: 1500,
    prepare: (page, w) => goToProjectWhereChooser(page, w, { shown: false }),
  },

  // ── 8 · Indicators ──────────────────────────────────────────────────────
  {
    key: 'new-indicator-definition',
    chapter: 8,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/projects/${w.projectId}/indicators/new`,
    clip: 'main',
    maxHeight: 1100,
  },
  {
    key: 'new-indicator-measurement',
    chapter: 8,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/projects/${w.projectId}/indicators/new`,
    clip: async (page) =>
      grow(
        await unionOf(
          page,
          page.getByText(/^measurement$/i).first(),
          page.getByText(/aggregation method/i).first(),
          page.getByText(/^(cumulative|average|latest|formula)$/i),
        ),
        20,
        page.viewportSize(),
      ),
    async prepare(page) {
      await centre(page, 'text=/aggregation method/i')
    },
  },
  {
    key: 'new-indicator-formula',
    chapter: 8,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/projects/${w.projectId}/indicators/new`,
    clip: 'main',
    maxHeight: 1100,
    async prepare(page) {
      // Aggregation Method → Formula reveals the builder.
      const formula = page.getByRole('button', { name: /^formula$/i }).first()
      if (await formula.count()) {
        await formula.click()
      } else {
        await page.getByText(/^formula$/i).first().click()
      }
      await page.waitForTimeout(400)
      await centre(page, 'text=/formula/i')
    },
  },
  {
    key: 'indicator-detail',
    chapter: 8,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/projects/${w.projectId}/indicators/${w.indicatorId}`,
    clip: 'main',
    maxHeight: 1700,
  },
]
