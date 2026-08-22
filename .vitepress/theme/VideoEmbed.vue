<template>
  <div class="video-embed" :class="{ 'is-placeholder': !src }">
    <!-- Local MP4 (our own walkthrough library) -->
    <div v-if="src && isLocal" class="video-wrapper">
      <div class="video-toolbar">
        <span class="video-chip">{{ videoLabel }}</span>
        <span v-if="duration" class="video-chip video-chip--time">{{ duration }}</span>
      </div>
      <video
        :src="src"
        :poster="poster"
        controls
        preload="none"
        playsinline
      />
    </div>

    <!-- Hosted embed (YouTube / Loom) -->
    <div v-else-if="src" class="video-wrapper">
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
      <p class="video-placeholder-sub">This walkthrough is being recorded.</p>
    </div>

    <p v-if="title && src" class="video-caption">{{ cleanTitle }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  src?: string      // /videos/xx.mp4 (local), or a YouTube/Loom URL
  title?: string    // caption shown below the video
  duration?: string // e.g. "45s" — shown as a chip on local videos
  poster?: string   // preview image; defaults to the matching poster for local files
}>()

const isLocal = computed(() => !!props.src && /\.(mp4|webm)(\?|$)/.test(props.src))

const poster = computed(() => {
  if (props.poster) return props.poster
  if (!props.src || !isLocal.value) return undefined
  const id = props.src.replace(/^.*\//, '').replace(/\.(mp4|webm)$/, '')
  return `/videos/posters/${id}.jpg`
})

const chapterMatch = computed(() => props.title?.match(/^(\d{2})\s*[·-]\s*(.+)$/))
const videoLabel = computed(() =>
  chapterMatch.value ? `Walkthrough ${chapterMatch.value[1]}` : 'Video walkthrough',
)
const cleanTitle = computed(() =>
  chapterMatch.value ? chapterMatch.value[2] : props.title || 'Walkthrough',
)

/** Converts a watch URL to an embed URL for YouTube and Loom */
const embedSrc = computed(() => {
  if (!props.src) return ''
  const url = props.src
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`
  const loomMatch = url.match(/loom\.com\/share\/([a-f0-9]+)/)
  if (loomMatch) return `https://www.loom.com/embed/${loomMatch[1]}`
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
  border-radius: 20px;
  overflow: hidden;
  background: #14170f;
  box-shadow: 0 18px 44px rgba(29, 28, 24, 0.18);
  border: 1px solid rgba(29, 28, 24, 0.08);
}

.video-toolbar {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 2;
  display: flex;
  gap: 8px;
  pointer-events: none;
}

.video-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 11px;
  border-radius: 999px;
  background: rgba(20, 23, 15, 0.78);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
}

.video-chip--time {
  background: rgba(174, 196, 45, 0.92);
  color: #14170f;
}

.video-wrapper iframe,
.video-wrapper video {
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
  min-height: 240px;
  padding: 26px;
  background:
    radial-gradient(circle at top right, rgba(174, 196, 45, 0.16), transparent 30%),
    linear-gradient(160deg, #14170f 0%, #232b16 100%);
  border: 1px solid rgba(174, 196, 45, 0.22);
  border-radius: 20px;
  cursor: default;
  position: relative;
  overflow: hidden;
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
  color: #f0f2df;
}

.video-placeholder__state {
  background: rgba(174, 196, 45, 0.18);
  color: #cfe06a;
}

.video-placeholder__play {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.06));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14);
}

.video-placeholder__play-icon {
  margin-left: 4px;
  color: #fff;
  font-size: 24px;
  line-height: 1;
}

.video-placeholder-title {
  position: relative;
  z-index: 1;
  max-width: 24ch;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: #fff;
  margin: 0;
}

.video-placeholder-sub {
  position: relative;
  z-index: 1;
  max-width: 40ch;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(240, 242, 223, 0.75);
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
    min-height: 210px;
    padding: 20px;
  }
  .video-placeholder-title {
    font-size: 21px;
  }
}
</style>
