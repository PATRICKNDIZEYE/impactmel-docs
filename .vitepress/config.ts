import { defineConfig } from 'vitepress'
import { figures } from './figures'

const start = [
  { text: 'Introduction', link: '/introduction' },
  { text: 'Sign up', link: '/getting-started/sign-up' },
  { text: 'Set up your workspace', link: '/getting-started/set-up-workspace' },
  { text: 'Invite your team', link: '/getting-started/invite-your-team' },
  { text: 'Finding your way', link: '/getting-started/finding-your-way' },
]

const roles = [
  { text: 'Roles at a glance', link: '/roles/' },
  { text: 'Organisation admin', link: '/roles/organisation-admin' },
  { text: 'Director', link: '/roles/director' },
  { text: 'M&E officer', link: '/roles/me-officer' },
  { text: 'Programme manager', link: '/roles/programme-manager' },
  { text: 'Field officer', link: '/roles/field-officer' },
  { text: 'Finance officer', link: '/roles/finance-officer' },
  { text: 'Viewer and funder', link: '/roles/viewer-and-funder' },
]

const plan = [
  { text: 'Programmes and projects', link: '/manual/programmes-and-projects' },
  { text: 'Results framework', link: '/manual/results-framework' },
  { text: 'Indicators, baselines and targets', link: '/manual/indicators' },
  { text: 'Reporting periods', link: '/manual/reporting-periods' },
]

const collect = [
  { text: 'Forms and the form builder', link: '/manual/forms' },
  { text: 'Collecting data', link: '/manual/collecting-data' },
  { text: 'Participants and registers', link: '/manual/participants' },
  { text: 'Activities and deadlines', link: '/manual/activities' },
]

const assure = [
  { text: 'Review and data quality', link: '/manual/review' },
  { text: 'Budgets and finance', link: '/manual/budgets' },
  { text: 'Risks', link: '/manual/risks' },
]

const report = [
  { text: 'Analysis and dashboards', link: '/manual/analysis' },
  { text: 'Sharing dashboards', link: '/manual/sharing-dashboards' },
  { text: 'Reports', link: '/manual/reports' },
  { text: 'Funder workspace', link: '/manual/funders' },
]

const connect = [
  { text: 'Integrations', link: '/manual/integrations' },
  { text: 'AI features', link: '/manual/ai' },
  { text: 'Administration', link: '/manual/administration' },
]

const reference = [
  { text: 'Security and data', link: '/security' },
  { text: 'Plans', link: '/plans' },
  { text: 'Release notes', link: '/release-notes' },
  { text: 'FAQ', link: '/faq' },
  { text: 'Video guides', link: '/videos/' },
]

export const sidebar = [
  { text: 'Getting started', items: start },
  { text: 'Roles', collapsed: true, items: roles },
  { text: 'Plan', items: [{ text: 'User manual overview', link: '/manual/' }, ...plan] },
  { text: 'Collect', items: collect },
  { text: 'Check', items: assure },
  { text: 'Report and share', items: report },
  { text: 'Connect and administer', items: connect },
  { text: 'Reference', items: reference },
]

export default defineConfig({
  title: 'ImpactMEL Docs',
  description: 'How to use ImpactMEL: plan, collect, check and report on your programmes.',
  lang: 'en-GB',
  cleanUrls: true,
  lastUpdated: false,
  srcExclude: ['README.md', 'scripts/**', 'print/**'],

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'alternate icon', href: '/favicon.png', type: 'image/png' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['meta', { name: 'theme-color', content: '#0a0a0a' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap' }],
  ],

  markdown: {
    config: (md) => figures(md),
  },

  themeConfig: {
    logo: { light: '/logo-black.svg', dark: '/logo-white.svg', alt: 'ImpactMEL' },
    siteTitle: false,
    nav: [
      { text: 'Get started', link: '/getting-started/sign-up' },
      { text: 'User manual', link: '/manual/' },
      { text: 'Roles', link: '/roles/' },
      { text: 'Release notes', link: '/release-notes' },
      { text: 'Videos', link: '/videos/' },
      { text: 'Open ImpactMEL', link: 'https://app.impactmel.com/login' },
    ],
    sidebar: { '/': sidebar },
    outline: { level: [2, 3], label: 'On this page' },
    search: { provider: 'local' },
    docFooter: { prev: 'Previous', next: 'Next' },
    footer: {
      message: 'Documentation for ImpactMEL release v0.10.36. <a href="/ImpactMEL-User-Guide.pdf">Download the printed user guide (PDF)</a>.',
      copyright: '© 2026 ImpactMEL · <a href="mailto:inquiries@impactmel.com">inquiries@impactmel.com</a>',
    },
  },
})
