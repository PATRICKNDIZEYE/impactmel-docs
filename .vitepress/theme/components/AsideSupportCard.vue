<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import {
  findCurrentGroup,
  flattenSidebar,
  getSectionMeta,
  normalizeRoutePath,
  resolveSidebarGroups,
} from '../utils/navigation'

const route = useRoute()
const { theme } = useData()

const currentPath = computed(() => normalizeRoutePath(route.path))
const sidebarGroups = computed(() => resolveSidebarGroups(theme.value.sidebar, currentPath.value))
const currentGroup = computed(() => findCurrentGroup(sidebarGroups.value, currentPath.value))
const section = computed(() => getSectionMeta(currentPath.value))

const suggestedLinks = computed(() => {
  const links = flattenSidebar(currentGroup.value?.items ?? sidebarGroups.value)
    .filter((item) => normalizeRoutePath(item.link) !== currentPath.value)
    .slice(0, 3)

  if (links.length) {
    return links
  }

  return [
    { text: 'Docs overview', link: '/' },
    { text: 'Quick start', link: '/guide/quick-start' },
    { text: 'Video guides', link: '/videos/' },
  ]
})
</script>

<template>
  <section class="aside-support">
    <div class="aside-support__art" aria-hidden="true">
      <span class="aside-support__ring"></span>
      <span class="aside-support__dot aside-support__dot--one"></span>
      <span class="aside-support__dot aside-support__dot--two"></span>
      <span class="aside-support__line"></span>
    </div>
    <p class="aside-support__eyebrow">Keep moving</p>
    <h3 class="aside-support__title">{{ section.title }}</h3>
    <p class="aside-support__copy">
      Jump to the next useful pages in this track without losing the thread.
    </p>
    <a
      v-for="item in suggestedLinks"
      :key="item.link"
      class="aside-support__link"
      :href="item.link"
    >
      <span>{{ item.text }}</span>
      <span class="aside-support__arrow">-&gt;</span>
    </a>
    <a class="aside-support__cta" href="/videos/">Browse video guides</a>
  </section>
</template>
