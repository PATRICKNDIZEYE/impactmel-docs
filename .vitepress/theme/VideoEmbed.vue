<template>
  <div class="vid" :class="{ 'vid--empty': !src }">
    <button v-if="src && isLocal" type="button" class="vid__card" :aria-label="`Play: ${cleanTitle}`" @click="open = true">
      <img v-if="poster" :src="poster" :alt="''" class="vid__poster" loading="lazy" />
      <span class="vid__shade" />
      <span class="vid__play" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="28" height="28"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
      </span>
      <span class="vid__meta">
        <span class="vid__label">{{ videoLabel }}</span>
        <span v-if="duration" class="vid__time">{{ duration }}</span>
      </span>
    </button>

    <div v-else-if="src" class="vid__frame">
      <iframe :src="embedSrc" frameborder="0" allowfullscreen allow="autoplay; encrypted-media; picture-in-picture" />
    </div>

    <div v-else class="vid__soon">
      <span class="vid__label">{{ videoLabel }}</span>
      <p>{{ cleanTitle }}</p>
      <small>Being recorded.</small>
    </div>

    <p v-if="title" class="vid__title">{{ cleanTitle }}</p>

    <Teleport to="body">
      <div v-if="open" class="vid-theatre" role="dialog" aria-modal="true" :aria-label="cleanTitle" @click.self="open = false">
        <div class="vid-theatre__inner">
          <div class="vid-theatre__bar">
            <span class="vid-theatre__title">{{ cleanTitle }}</span>
            <button type="button" class="vid-theatre__close" aria-label="Close video" @click="open = false">
              <svg viewBox="0 0 24 24" width="22" height="22"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" /></svg>
            </button>
          </div>
          <video ref="player" :src="src" :poster="poster" controls autoplay playsinline preload="auto" />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps<{
  src?: string
  title?: string
  duration?: string
  poster?: string
}>()

const open = ref(false)
const player = ref<HTMLVideoElement | null>(null)

const isLocal = computed(() => !!props.src && /\.(mp4|webm)(\?|$)/.test(props.src))
const poster = computed(() => {
  if (props.poster) return props.poster
  if (!props.src || !isLocal.value) return undefined
  const id = props.src.replace(/^.*\//, '').replace(/\.(mp4|webm)$/, '')
  return `/videos/posters/${id}.jpg`
})
const chapterMatch = computed(() => props.title?.match(/^(\d{2})\s*[·-]\s*(.+)$/))
const videoLabel = computed(() => (chapterMatch.value ? `Walkthrough ${chapterMatch.value[1]}` : 'Video walkthrough'))
const cleanTitle = computed(() => (chapterMatch.value ? chapterMatch.value[2] : props.title || 'Walkthrough'))

const embedSrc = computed(() => {
  const url = props.src ?? ''
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?rel=0&modestbranding=1`
  const loom = url.match(/loom\.com\/share\/([a-f0-9]+)/)
  if (loom) return `https://www.loom.com/embed/${loom[1]}`
  return url
})

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') open.value = false
}
watch(open, (v) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = v ? 'hidden' : ''
  if (v) document.addEventListener('keydown', onKey)
  else {
    document.removeEventListener('keydown', onKey)
    player.value?.pause()
  }
})
onBeforeUnmount(() => {
  if (typeof document === 'undefined') return
  document.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.vid { margin: 24px 0 30px; }

.vid__card {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  padding: 0;
  border: 1px solid rgba(29, 28, 24, 0.1);
  border-radius: 18px;
  overflow: hidden;
  background: #141a0c;
  cursor: pointer;
  box-shadow: 0 16px 40px rgba(29, 28, 24, 0.16);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}
.vid__card:hover { transform: translateY(-2px); box-shadow: 0 22px 50px rgba(29, 28, 24, 0.22); }
.vid__card:focus-visible { outline: 3px solid #d9ef42; outline-offset: 3px; }

.vid__poster { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.vid__shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(20, 26, 12, 0) 45%, rgba(20, 26, 12, 0.55) 100%); }

.vid__play {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  place-items: center;
  width: 72px;
  height: 72px;
  padding-left: 4px;
  border-radius: 999px;
  background: #d9ef42;
  color: #141a0c;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  transition: transform 0.18s ease;
}
.vid__card:hover .vid__play { transform: translate(-50%, -50%) scale(1.08); }

.vid__meta { position: absolute; left: 14px; right: 14px; bottom: 12px; display: flex; justify-content: space-between; gap: 8px; }
.vid__label,
.vid__time {
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: rgba(20, 26, 12, 0.78);
  color: #fff;
}
.vid__time { background: #d9ef42; color: #141a0c; }

.vid__frame { border-radius: 18px; overflow: hidden; background: #141a0c; }
.vid__frame iframe { display: block; width: 100%; aspect-ratio: 16 / 9; border: 0; }

.vid__soon {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 6px;
  aspect-ratio: 16 / 9;
  padding: 22px;
  border-radius: 18px;
  background: linear-gradient(160deg, #141a0c, #232b16);
  color: #fff;
}
.vid__soon p { margin: 0; font-size: 22px; font-weight: 700; }
.vid__soon small { color: rgba(255, 255, 255, 0.7); }

.vid__title { margin: 10px 2px 0; font-size: 14px; font-weight: 650; color: var(--vp-c-text-1); line-height: 1.4; }
</style>

<style>
.vid-theatre {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  padding: 3vh 3vw;
  background: rgba(10, 13, 7, 0.9);
  backdrop-filter: blur(6px);
  animation: vid-in 0.18s ease;
}
.vid-theatre__inner { width: min(94vw, calc((94vh - 56px) * 16 / 9)); }
.vid-theatre__bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 10px; color: #fff; }
.vid-theatre__title { font-size: 16px; font-weight: 650; }
.vid-theatre__close {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  cursor: pointer;
}
.vid-theatre__close:hover { background: rgba(255, 255, 255, 0.22); }
.vid-theatre video { display: block; width: 100%; aspect-ratio: 16 / 9; border-radius: 14px; background: #000; box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5); }
@keyframes vid-in { from { opacity: 0; } to { opacity: 1; } }
</style>
