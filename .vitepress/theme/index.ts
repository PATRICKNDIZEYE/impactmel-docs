import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

// Click a screenshot to see it full size; click again or press Escape to close.
function zoom() {
  if (typeof document === 'undefined') return
  document.addEventListener('click', (e) => {
    const t = e.target as HTMLElement
    const open = document.querySelector('.zoom-layer')
    if (open) { open.remove(); return }
    if (t instanceof HTMLImageElement && t.closest('figure.shot')) {
      const layer = document.createElement('div')
      layer.className = 'zoom-layer'
      const img = document.createElement('img')
      img.src = t.src; img.alt = t.alt
      layer.appendChild(img)
      document.body.appendChild(layer)
    }
  })
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') document.querySelector('.zoom-layer')?.remove() })
}

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp() { zoom() },
}
export default theme
