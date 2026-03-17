<template>
  <div>
    <!-- Clickable image link -->
    <a href="#" @click.prevent="openModal" class="image-link">
      <img :src="src" :alt="alt" class="modal-trigger-img" />
    </a>

    <!-- Modal Overlay -->
    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
      <!-- Modal Content -->
      <div class="modal-content" @click.stop>
        <!-- Close Button -->
        <button class="modal-close" @click="closeModal" title="Close (Esc)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <!-- Image -->
        <img :src="src" :alt="alt" class="modal-image" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  src: string
  alt?: string
}

const props = withDefaults(defineProps<Props>(), {
  alt: 'Image'
})

const isOpen = ref(false)

const openModal = () => {
  isOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isOpen.value = false
  document.body.style.overflow = 'auto'
}

const handleEscapeKey = (event: KeyboardEvent) => {
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
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
}

.modal-trigger-img {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: opacity 0.2s ease;
}

.modal-trigger-img:hover {
  opacity: 0.8;
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-in-out;
}

/* Modal Content */
.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease-out;
}

.modal-image {
  width: 100%;
  height: 100%;
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
}

/* Close Button */
.modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  border: none;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  z-index: 1001;
}

.modal-close:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
