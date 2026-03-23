export interface SidebarItem {
  text?: string
  link?: string
  items?: SidebarItem[]
}

export interface SectionMeta {
  prefix: string
  kicker: string
  title: string
  description: string
}

const SECTION_META: SectionMeta[] = [
  {
    prefix: '/user-manual',
    kicker: 'Daily tasks',
    title: 'User Manual',
    description:
      'Step-by-step guidance for admins, M&E officers, reviewers, and field teams.',
  },
  {
    prefix: '/guide',
    kicker: 'Team setup',
    title: 'Setup Guide',
    description: 'Use this track for rollout planning, onboarding, and setup decisions.',
  },
  {
    prefix: '/architecture',
    kicker: 'Behind the scenes',
    title: 'Architecture',
    description: 'Reference for teams who want a closer look at how the product is organized.',
  },
  {
    prefix: '/modules',
    kicker: 'Feature reference',
    title: 'Core Modules',
    description: 'Feature-by-feature reference for the main areas of the platform.',
  },
  {
    prefix: '/api',
    kicker: 'Developer docs',
    title: 'API Reference',
    description: 'Reference for connecting ImpactMEL with other tools and automations.',
  },
  {
    prefix: '/videos',
    kicker: 'Walkthroughs',
    title: 'Video Guides',
    description:
      'Short guided demos for teams that prefer to learn the platform by watching real flows.',
  },
  {
    prefix: '/',
    kicker: 'Documentation hub',
    title: 'ImpactMEL Docs',
    description:
      'Browse the user manual, setup guide, videos, and advanced reference in one place.',
  },
]

export function normalizeRoutePath(path = '/'): string {
  const normalized = path
    .replace(/\/index\.html$/, '/')
    .replace(/index\.html$/, '/')
    .replace(/\.html$/, '')
    .replace(/\/$/, '')

  return normalized || '/'
}

export function resolveSidebarGroups(
  sidebarConfig: Record<string, SidebarItem[]> | SidebarItem[] | undefined,
  path: string,
): SidebarItem[] {
  if (Array.isArray(sidebarConfig)) {
    return sidebarConfig
  }

  if (!sidebarConfig || typeof sidebarConfig !== 'object') {
    return []
  }

  const normalizedPath = normalizeRoutePath(path)
  const matchedPrefix = Object.keys(sidebarConfig)
    .sort((left, right) => right.length - left.length)
    .find((prefix) => {
      const normalizedPrefix = normalizeRoutePath(prefix)
      return normalizedPath === normalizedPrefix || normalizedPath.startsWith(`${normalizedPrefix}/`)
    })

  return matchedPrefix ? sidebarConfig[matchedPrefix] : []
}

export function flattenSidebar(items: SidebarItem[] = []): SidebarItem[] {
  const links: SidebarItem[] = []

  for (const item of items) {
    if (item.link) {
      links.push(item)
    }

    if (item.items?.length) {
      links.push(...flattenSidebar(item.items))
    }
  }

  return links
}

export function findCurrentItem(items: SidebarItem[] = [], path: string): SidebarItem | null {
  const normalizedPath = normalizeRoutePath(path)

  return (
    flattenSidebar(items).find((item) => normalizeRoutePath(item.link) === normalizedPath) ?? null
  )
}

export function findCurrentGroup(items: SidebarItem[] = [], path: string): SidebarItem | null {
  const normalizedPath = normalizeRoutePath(path)

  return (
    items.find((item) =>
      flattenSidebar(item.items ?? []).some(
        (entry) => normalizeRoutePath(entry.link) === normalizedPath,
      ),
    ) ?? items[0] ?? null
  )
}

export function getSectionMeta(path: string): SectionMeta {
  const normalizedPath = normalizeRoutePath(path)

  return (
    SECTION_META.find(
      (section) =>
        normalizedPath === section.prefix || normalizedPath.startsWith(`${section.prefix}/`),
    ) ?? SECTION_META[SECTION_META.length - 1]
  )
}
