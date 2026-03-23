<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import {
  flattenSidebar,
  getSectionMeta,
  normalizeRoutePath,
  resolveSidebarGroups,
} from '../utils/navigation'

const route = useRoute()
const { theme } = useData()

const currentPath = computed(() => normalizeRoutePath(route.path))
const sidebarGroups = computed(() => resolveSidebarGroups(theme.value.sidebar, currentPath.value))
const section = computed(() => getSectionMeta(currentPath.value))
const pageCount = computed(() => flattenSidebar(sidebarGroups.value).length)

function openSearch() {
  document.querySelector<HTMLButtonElement>('.VPNavBarSearch .DocSearch-Button')?.click()
}
</script>

<template>
  <section class="sidebar-intro">
    <div class="sidebar-intro__badge">{{ section.kicker }}</div>
    <h2 class="sidebar-intro__title">{{ section.title }}</h2>
    <p class="sidebar-intro__copy">{{ section.description }}</p>
    <button class="sidebar-intro__search" type="button" @click="openSearch">
      <span>Search the docs</span>
      <span class="sidebar-intro__shortcut">Ctrl K</span>
    </button>
    <p class="sidebar-intro__meta">{{ pageCount }} pages in this section</p>
  </section>
</template>
