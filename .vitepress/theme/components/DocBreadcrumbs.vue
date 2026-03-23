<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import {
  findCurrentGroup,
  findCurrentItem,
  normalizeRoutePath,
  resolveSidebarGroups,
} from '../utils/navigation'

const route = useRoute()
const { page, theme } = useData()

const currentPath = computed(() => normalizeRoutePath(route.path))
const sidebarGroups = computed(() => resolveSidebarGroups(theme.value.sidebar, currentPath.value))
const currentGroup = computed(() => findCurrentGroup(sidebarGroups.value, currentPath.value))
const currentItem = computed(() => findCurrentItem(sidebarGroups.value, currentPath.value))
const currentTitle = computed(() => page.value.title || currentItem.value?.text || 'Documentation')
</script>

<template>
  <nav class="doc-breadcrumbs" aria-label="Breadcrumb">
    <a href="/">Docs Home</a>
    <template v-if="currentGroup?.text && currentGroup.text !== currentTitle">
      <span class="doc-breadcrumbs__sep">/</span>
      <span>{{ currentGroup.text }}</span>
    </template>
    <span class="doc-breadcrumbs__sep">/</span>
    <span class="doc-breadcrumbs__current">{{ currentTitle }}</span>
  </nav>
</template>
