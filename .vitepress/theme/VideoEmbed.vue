<template>
  <div class="video-embed" :class="{ 'is-placeholder': !src }">
    <div v-if="src" class="video-wrapper">
      <div class="video-toolbar">
        <span class="video-chip">{{ videoLabel }}</span>
      </div>
      <iframe
        :src="embedSrc"
        frameborder="0"
        allowfullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>

    <div v-else class="video-placeholder">
      <div class="video-placeholder__header">
        <span class="video-placeholder__badge">{{ videoLabel }}</span>
        <span class="video-placeholder__state">Coming soon</span>
      </div>
      <div class="video-placeholder__play">
        <span class="video-placeholder__play-icon">▶</span>
      </div>
      <p class="video-placeholder-title">{{ cleanTitle }}</p>
      <p class="video-placeholder-sub">
        This walkthrough slot is ready for a YouTube or Loom URL.
      </p>
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

const chapterMatch = computed(() => props.title?.match(/^(\d{2})\s*[·-]\s*(.+)$/))
const videoLabel = computed(() => {
  if (chapterMatch.value) {
    return `Walkthrough ${chapterMatch.value[1]}`
  }

  return 'Video walkthrough'
})

const cleanTitle = computed(() => {
  if (chapterMatch.value) {
    return chapterMatch.value[2]
  }

  return props.title || 'Walkthrough'
})

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
  margin: 28px 0 32px;
}

.video-wrapper {
  position: relative;
  width: 100%;
  border-radius: 24px;
  overflow: hidden;
  background: #000;
  box-shadow: 0 20px 48px rgba(10, 16, 35, 0.18);
}

.video-toolbar {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 2;
}

.video-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(9, 13, 28, 0.72);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
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
  justify-content: flex-end;
  gap: 14px;
  width: 100%;
  aspect-ratio: 16 / 9;
  min-height: 260px;
  padding: 26px;
  background:
    radial-gradient(circle at top right, rgba(126, 161, 255, 0.18), transparent 24%),
    linear-gradient(160deg, #0f1732 0%, #172656 100%);
  border: 1px solid rgba(126, 161, 255, 0.2);
  border-radius: 24px;
  cursor: default;
  position: relative;
  overflow: hidden;
}

.video-placeholder::before {
  content: '';
  position: absolute;
  inset: 20px 20px auto auto;
  width: 140px;
  height: 140px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(28, 208, 147, 0.18), transparent 70%);
}

.video-placeholder__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 1;
}

.video-placeholder__badge,
.video-placeholder__state {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.video-placeholder__badge {
  background: rgba(255, 255, 255, 0.1);
  color: #dce6ff;
}

.video-placeholder__state {
  background: rgba(28, 208, 147, 0.14);
  color: #8af1c7;
}

.video-placeholder__play {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 76px;
  height: 76px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.06));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14);
}

.video-placeholder__play-icon {
  margin-left: 4px;
  color: #fff;
  font-size: 26px;
  line-height: 1;
}

.video-placeholder-title {
  position: relative;
  z-index: 1;
  max-width: 22ch;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: #fff;
  margin: 0;
}

.video-placeholder-sub {
  position: relative;
  z-index: 1;
  max-width: 38ch;
  font-size: 14px;
  line-height: 1.65;
  color: rgba(220, 230, 255, 0.78);
  margin: 0;
}

.video-caption {
  margin: 12px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
  text-align: center;
  font-weight: 600;
}

@media (max-width: 640px) {
  .video-placeholder {
    min-height: 220px;
    padding: 20px;
  }

  .video-placeholder__header {
    flex-wrap: wrap;
  }

  .video-placeholder-title {
    font-size: 22px;
  }
}
</style>
