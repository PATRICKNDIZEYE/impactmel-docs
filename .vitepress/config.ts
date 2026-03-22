import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'ImpactMEL',
  description: 'Enterprise Monitoring, Evaluation & Learning Platform — Documentation',

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#1e3a5f' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;1,14..32,400&family=Plus+Jakarta+Sans:wght@600;700;800&family=JetBrains+Mono:wght@400;500&display=swap',
      },
    ],
  ],

  ignoreDeadLinks: [
    /localhost/,
    /app\.impactmel\.com/,
    /api\.impactmel\.com/,
  ],

  themeConfig: {
    logo: {
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
    },
    siteTitle: 'ImpactMEL',

    nav: [
      { text: 'Videos', link: '/videos/' },
      { text: 'User Manual', link: '/user-manual/overview' },
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Architecture', link: '/architecture/overview' },
      { text: 'Modules', link: '/modules/authentication' },
      { text: 'API', link: '/api/overview' },
      {
        text: 'v1.0',
        items: [
          { text: 'Changelog', link: '/guide/changelog' },
          { text: 'app.impactmel.com', link: 'https://app.impactmel.com', target: '_blank' },
        ],
      },
    ],

    sidebar: [
      {
        text: 'Video Guides',
        collapsed: false,
        items: [
          { text: 'All 30 videos', link: '/videos/' },
        ],
      },
      {
        text: 'User Manual',
        collapsed: false,
        items: [
          { text: 'Platform Overview', link: '/user-manual/overview' },
          { text: 'Getting Started', link: '/user-manual/getting-started' },
          { text: 'Dashboard', link: '/user-manual/dashboard' },
          { text: 'Programs', link: '/user-manual/programs' },
          { text: 'Projects', link: '/user-manual/projects' },
          { text: 'Indicators', link: '/user-manual/indicators' },
          { text: 'Entering Data', link: '/user-manual/data-entry' },
          { text: 'Activities & Participants', link: '/user-manual/activities' },
          { text: 'Data Collection Forms', link: '/user-manual/forms' },
          { text: 'Reports', link: '/user-manual/reports' },
          { text: 'Settings & Administration', link: '/user-manual/settings' },
          { text: 'Roles & Permissions', link: '/user-manual/roles-permissions' },
        ],
      },
      {
        text: 'Getting Started',
        collapsed: true,
        items: [
          { text: 'Introduction', link: '/guide/introduction' },
          { text: 'Quick Start', link: '/guide/quick-start' },
          { text: 'Environment Setup', link: '/guide/environment' },
          { text: 'Changelog', link: '/guide/changelog' },
        ],
      },
      {
        text: 'Architecture',
        collapsed: true,
        items: [
          { text: 'System Overview', link: '/architecture/overview' },
          { text: 'Tech Stack', link: '/architecture/tech-stack' },
          { text: 'Data Model', link: '/architecture/data-model' },
          { text: 'Security Model', link: '/architecture/security' },
        ],
      },
      {
        text: 'Core Modules',
        collapsed: true,
        items: [
          { text: 'Authentication', link: '/modules/authentication' },
          { text: 'Organizations', link: '/modules/organizations' },
          { text: 'Programs & Projects', link: '/modules/programs-projects' },
          { text: 'Results Framework', link: '/modules/results-framework' },
          { text: 'Indicators', link: '/modules/indicators' },
          { text: 'Reporting Periods', link: '/modules/reporting-periods' },
          { text: 'Activities & Participants', link: '/modules/activities' },
          { text: 'Data Collection', link: '/modules/data-collection' },
          { text: 'Reports', link: '/modules/reports' },
          { text: 'Budget & Finance', link: '/modules/budget' },
          { text: 'Donors', link: '/modules/donors' },
          { text: 'Dashboard', link: '/modules/dashboard' },
        ],
      },
      {
        text: 'API Reference',
        collapsed: true,
        items: [
          { text: 'Overview & Auth', link: '/api/overview' },
          { text: 'Programs', link: '/api/programs' },
          { text: 'Indicators', link: '/api/indicators' },
          { text: 'Reports', link: '/api/reports' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/impactmel' },
    ],

    footer: {
      message: 'ImpactMEL — Enterprise M&E Platform',
      copyright: 'Copyright © 2025 ImpactMEL. All rights reserved.',
    },

    search: {
      provider: 'local',
    },

    editLink: {
      pattern: 'https://github.com/impactmel/docs/edit/main/:path',
      text: 'Edit this page on GitHub',
    },
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
})
