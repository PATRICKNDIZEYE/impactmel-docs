import { defineConfig } from 'vitepress'

const docsHubSidebar = [
  {
    text: 'Documentation Hub',
    collapsed: false,
    items: [
      { text: 'Overview', link: '/' },
      { text: 'Quick Start', link: '/guide/quick-start' },
      { text: 'User Manual', link: '/user-manual/overview' },
      { text: 'Architecture', link: '/architecture/overview' },
      { text: 'API Overview', link: '/api/overview' },
      { text: 'Video Guides', link: '/videos/' },
    ],
  },
  {
    text: 'Popular Pages',
    collapsed: false,
    items: [
      { text: 'Getting Started', link: '/user-manual/getting-started' },
      { text: 'Results Framework', link: '/modules/results-framework' },
      { text: 'Reports', link: '/modules/reports' },
      { text: 'Environment Setup', link: '/guide/environment' },
    ],
  },
]

const userManualSidebar = [
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
      { text: 'Activities and Participants', link: '/user-manual/activities' },
      { text: 'Data Collection Forms', link: '/user-manual/forms' },
      { text: 'Reports', link: '/user-manual/reports' },
      { text: 'Settings and Administration', link: '/user-manual/settings' },
      { text: 'Roles and Permissions', link: '/user-manual/roles-permissions' },
    ],
  },
]

const guideSidebar = [
  {
    text: 'Guide',
    collapsed: false,
    items: [
      { text: 'Introduction', link: '/guide/introduction' },
      { text: 'Quick Start', link: '/guide/quick-start' },
      { text: 'Environment Setup', link: '/guide/environment' },
      { text: 'Changelog', link: '/guide/changelog' },
    ],
  },
]

const architectureSidebar = [
  {
    text: 'Architecture',
    collapsed: false,
    items: [
      { text: 'System Overview', link: '/architecture/overview' },
      { text: 'Tech Stack', link: '/architecture/tech-stack' },
      { text: 'Data Model', link: '/architecture/data-model' },
      { text: 'Security Model', link: '/architecture/security' },
    ],
  },
]

const moduleSidebar = [
  {
    text: 'Core Modules',
    collapsed: false,
    items: [
      { text: 'Authentication', link: '/modules/authentication' },
      { text: 'Organizations', link: '/modules/organizations' },
      { text: 'Programs and Projects', link: '/modules/programs-projects' },
      { text: 'Results Framework', link: '/modules/results-framework' },
      { text: 'Indicators', link: '/modules/indicators' },
      { text: 'Reporting Periods', link: '/modules/reporting-periods' },
      { text: 'Activities and Participants', link: '/modules/activities' },
      { text: 'Data Collection', link: '/modules/data-collection' },
      { text: 'Reports', link: '/modules/reports' },
      { text: 'Budget and Finance', link: '/modules/budget' },
      { text: 'Donors', link: '/modules/donors' },
      { text: 'Dashboard', link: '/modules/dashboard' },
    ],
  },
]

const apiSidebar = [
  {
    text: 'API Reference',
    collapsed: false,
    items: [
      { text: 'Overview and Auth', link: '/api/overview' },
      { text: 'Programs', link: '/api/programs' },
      { text: 'Indicators', link: '/api/indicators' },
      { text: 'Reports', link: '/api/reports' },
    ],
  },
]

const videoSidebar = [
  {
    text: 'Video Guides',
    collapsed: false,
    items: [{ text: 'All 30 videos', link: '/videos/' }],
  },
]

export default defineConfig({
  title: 'ImpactMEL Docs',
  description: 'Enterprise Monitoring, Evaluation & Learning Platform documentation',

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#2756ff' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap',
      },
    ],
  ],

  ignoreDeadLinks: [/localhost/, /app\.impactmel\.com/, /api\.impactmel\.com/],

  themeConfig: {
    logo: {
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="10" fill="currentColor"/><path d="M10 21V14.5M16 21V10M22 21V16.75" stroke="white" stroke-width="2.6" stroke-linecap="round"/><path d="M10 14.5L16 10L22 16.75" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity=".6"/></svg>',
    },
    siteTitle: 'ImpactMEL Docs',

    nav: [
      { text: 'Overview', link: '/' },
      { text: 'User Manual', link: '/user-manual/overview' },
      {
        text: 'Implementation',
        items: [
          { text: 'Guide', link: '/guide/introduction' },
          { text: 'Architecture', link: '/architecture/overview' },
          { text: 'Core Modules', link: '/modules/authentication' },
        ],
      },
      { text: 'API', link: '/api/overview' },
      { text: 'Videos', link: '/videos/' },
      { text: 'Open App', link: 'https://app.impactmel.com', target: '_blank' },
    ],

    sidebar: {
      '/videos/': videoSidebar,
      '/user-manual/': userManualSidebar,
      '/guide/': guideSidebar,
      '/architecture/': architectureSidebar,
      '/modules/': moduleSidebar,
      '/api/': apiSidebar,
      '/': docsHubSidebar,
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/impactmel' }],

    footer: {
      message: 'ImpactMEL documentation workspace',
      copyright: 'Copyright © 2026 ImpactMEL. All rights reserved.',
    },

    search: {
      provider: 'local',
    },

    outline: {
      level: [2, 3],
      label: 'On this page',
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
