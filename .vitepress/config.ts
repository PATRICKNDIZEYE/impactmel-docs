import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'ImpactMEL',
  description: 'Enterprise Monitoring, Evaluation & Learning Platform — Technical Documentation',

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#1a2a3f' }],
  ],

  themeConfig: {
    logo: { svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>' },
    siteTitle: 'ImpactMEL Docs',

    nav: [
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
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/guide/introduction' },
          { text: 'Quick Start', link: '/guide/quick-start' },
          { text: 'Environment Setup', link: '/guide/environment' },
          { text: 'Changelog', link: '/guide/changelog' },
        ],
      },
      {
        text: 'Architecture',
        items: [
          { text: 'System Overview', link: '/architecture/overview' },
          { text: 'Tech Stack', link: '/architecture/tech-stack' },
          { text: 'Data Model', link: '/architecture/data-model' },
          { text: 'Security Model', link: '/architecture/security' },
        ],
      },
      {
        text: 'Core Modules',
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

  ignoreDeadLinks: [
    /localhost/,
    /app\.impactmel\.com/,
  ],

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
})
