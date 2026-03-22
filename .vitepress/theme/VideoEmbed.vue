<template>
  <div class="video-embed">
    <!-- Live video -->
    <div v-if="src" class="video-wrapper">
      <iframe
        :src="embedSrc"
        frameborder="0"
        allowfullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>

    <!-- Placeholder — shown until URL is filled in -->
    <div v-else class="video-placeholder">
      <div class="video-placeholder-icon">▶</div>
      <p class="video-placeholder-title">{{ title }}</p>
      <p class="video-placeholder-sub">Video coming soon</p>
    </div>

    <p v-if="title && src" class="video-caption">{{ title }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  src?: string   // YouTube or Loom URL — leave empty for placeholder
  title?: string // caption shown below the video
}>()

/** Converts a watch URL to an embed URL for YouTube and Loom */
const embedSrc = computed(() => {
  if (!props.src) return ''
  const url = props.src

  // YouTube: https://www.youtube.com/watch?v=ID or https://youtu.be/ID
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`

  // Loom: https://www.loom.com/share/ID
  const loomMatch = url.match(/loom\.com\/share\/([a-f0-9]+)/)
  if (loomMatch) return `https://www.loom.com/embed/${loomMatch[1]}`

  // Already an embed URL — return as-is
  return url
})
</script>

<style scoped>
.video-embed {
  margin: 28px 0;
}

.video-wrapper {
  position: relative;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  background: #000;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
}

.video-wrapper iframe {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  border: none;
}

.video-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 340px;
  background: var(--vp-c-bg-soft);
  border: 2px dashed var(--vp-c-divider);
  border-radius: 12px;
  cursor: default;
}

.video-placeholder-icon {
  font-size: 32px;
  opacity: 0.25;
  line-height: 1;
}

.video-placeholder-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0;
  text-align: center;
  padding: 0 24px;
}

.video-placeholder-sub {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin: 0;
}

.video-caption {
  margin: 10px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
  text-align: center;
  font-style: italic;
}
</style>
