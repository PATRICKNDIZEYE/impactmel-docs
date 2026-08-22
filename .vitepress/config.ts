import { defineConfig } from 'vitepress'

const docsHubSidebar = [
  {
    text: 'Start Here',
    collapsed: false,
    items: [
      { text: 'Overview', link: '/' },
      { text: 'Getting Started', link: '/user-manual/getting-started' },
      { text: 'Quick Start', link: '/guide/quick-start' },
      { text: 'User Manual', link: '/user-manual/overview' },
      { text: 'Video Guides', link: '/videos/' },
    ],
  },
  {
    text: 'Going Further',
    collapsed: true,
    items: [
      { text: 'Guide Introduction', link: '/guide/introduction' },
      { text: 'Results Framework', link: '/user-manual/results-framework' },
      { text: 'Security & Compliance', link: '/guide/security-compliance' },
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
      { text: 'Results Framework', link: '/user-manual/results-framework' },
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
      { text: 'Why ImpactMEL', link: '/guide/why-impactmel' },
      { text: 'Changelog', link: '/guide/changelog' },
    ],
  },
  {
    text: 'Roadmap & Trust',
    collapsed: false,
    items: [
      { text: 'Pricing', link: '/guide/pricing' },
      { text: 'Roadmap', link: '/guide/roadmap' },
      { text: 'Security & Compliance', link: '/guide/security-compliance' },
    ],
  },
]

const videoSidebar = [
  {
    text: 'Video Guides',
    collapsed: false,
    items: [{ text: 'All 47 videos', link: '/videos/' }],
  },
]

export default defineConfig({
  title: 'ImpactMEL Docs',
  description: 'Enterprise Monitoring, Evaluation & Learning Platform documentation',

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#14170f' }],
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
      { text: 'Getting Started', link: '/user-manual/getting-started' },
      { text: 'User Manual', link: '/user-manual/overview' },
      {
        text: 'Reference',
        items: [
          { text: 'Why ImpactMEL', link: '/guide/why-impactmel' },
          { text: 'Pricing', link: '/guide/pricing' },
          { text: 'Roadmap', link: '/guide/roadmap' },
          { text: 'Guide', link: '/guide/introduction' },
          { text: 'Quick Start', link: '/guide/quick-start' },
          { text: 'Security & Compliance', link: '/guide/security-compliance' },
        ],
      },
      { text: 'Videos', link: '/videos/' },
      { text: 'Open App', link: 'https://app.impactmel.com', target: '_blank' },
    ],

    sidebar: {
      '/videos/': videoSidebar,
      '/user-manual/': userManualSidebar,
      '/guide/': guideSidebar,
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
