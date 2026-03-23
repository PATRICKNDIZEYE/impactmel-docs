<template>
  <div>
    <a href="#" class="image-link" @click.prevent="openModal">
      <img :src="src" :alt="alt" class="modal-trigger-img" />
    </a>

    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" title="Close" @click="closeModal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <img :src="src" :alt="alt" class="modal-image" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

interface Props {
  src: string
  alt?: string
}

withDefaults(defineProps<Props>(), {
  alt: 'Image',
})

const isOpen = ref(false)

function openModal() {
  isOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  isOpen.value = false
  document.body.style.overflow = 'auto'
}

function handleEscapeKey(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
  document.body.style.overflow = 'auto'
})
</script>

<style scoped>
.image-link {
  display: inline-block;
  cursor: zoom-in;
  text-decoration: none;
}

.modal-trigger-img {
  display: block;
  width: 100%;
  height: auto;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(7, 11, 23, 0.72);
  backdrop-filter: blur(10px);
  z-index: 1000;
}

.modal-content {
  position: relative;
  max-width: min(92vw, 1400px);
  max-height: 92vh;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.35);
}

.modal-image {
  display: block;
  max-width: min(92vw, 1400px);
  max-height: 92vh;
  object-fit: contain;
  background: #fff;
}

.modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 999px;
  background: rgba(8, 12, 24, 0.68);
  color: #fff;
  cursor: pointer;
}
</style>
