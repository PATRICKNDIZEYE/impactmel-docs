import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import AsideSupportCard from './components/AsideSupportCard.vue'
import DocBreadcrumbs from './components/DocBreadcrumbs.vue'
import ImageModal from './components/ImageModal.vue'
import SidebarIntro from './components/SidebarIntro.vue'
import VideoEmbed from './VideoEmbed.vue'
import './custom.css'

const theme: Theme = {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'sidebar-nav-before': () => h(SidebarIntro),
      'doc-top': () => h(DocBreadcrumbs),
      'aside-bottom': () => h(AsideSupportCard),
    }),
  enhanceApp({ app }) {
    app.component('ImageModal', ImageModal)
    app.component('VideoEmbed', VideoEmbed)
  },
}

export default theme
