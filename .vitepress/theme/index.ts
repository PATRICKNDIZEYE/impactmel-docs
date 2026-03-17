import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ImageModal from './components/ImageModal.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('ImageModal', ImageModal)
  }
}
