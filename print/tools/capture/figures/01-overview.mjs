// Chapters 1–3: the platform, getting in, and the dashboard.

import { centre, unionOf, grow } from '../lib/regions.mjs'

export default [
  {
    key: 'app-home',
    chapter: 1,
    as: 'org_admin',
    url: (w) => `/org/${w.orgId}/dashboard`,
    // Top bar included on purpose: this is the first picture in the manual and
    // it has to show the whole frame, not the content in isolation.
    clip: 'viewport',
  },
  {
    key: 'register',
    chapter: 2,
    as: 'anon',
    url: '/register',
    clip: 'viewport',
  },
  {
    key: 'top-nav-annotated',
    chapter: 2,
    as: 'org_admin',
    url: (w) => `/org/${w.orgId}/dashboard`,
    clip: 'topnav',
    padding: 8,
  },
  {
    key: 'invite-member',
    chapter: 2,
    as: 'org_admin',
    url: (w) => `/org/${w.orgId}/settings/members`,
    clip: 'main',
    maxHeight: 900,
    async prepare(page) {
      await centre(page, 'text=/invite by email/i')
    },
  },
  {
    key: 'dashboard-admin',
    chapter: 3,
    as: 'org_admin',
    url: (w) => `/org/${w.orgId}/dashboard`,
    clip: 'main',
    maxHeight: 2200,
  },
  {
    key: 'dashboard-tiles',
    chapter: 3,
    as: 'org_admin',
    url: (w) => `/org/${w.orgId}/dashboard`,
    clip: async (page) =>
      grow(
        await unionOf(
          page,
          page.getByText('Submissions Approved', { exact: false }).locator('xpath=ancestor::*[self::div][3]'),
          page.getByText('Indicators On Track', { exact: false }).locator('xpath=ancestor::*[self::div][3]'),
        ),
        14,
        page.viewportSize(),
      ),
  },
  {
    key: 'dashboard-overview',
    chapter: 3,
    as: 'me_officer',
    url: (w) => `/org/${w.orgId}/dashboard`,
    clip: 'main',
    maxHeight: 1800,
  },
  {
    key: 'statistics',
    chapter: 3,
    as: 'org_admin',
    url: (w) => `/org/${w.orgId}/statistics`,
    clip: 'main',
    maxHeight: 1100,
  },
]
