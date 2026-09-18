/** Named regions. A recipe's `clip` may be one of these, a CSS selector, or a function. */
export const REGIONS = {
  /** The visible window — what a person sees without scrolling. */
  viewport: async () => null,

  /** The top bar on its own, for the annotated navigation figure. */
  topnav: 'header:has(nav), nav[aria-label*="Main"], [data-slot="top-nav"]',

  // Radix renders a confirmation as role="alertdialog", not "dialog".
  dialog: '[role="dialog"], [role="alertdialog"]',

  /** The page's own content, minus the top bar — the usual choice. */
  main: 'main, [role="main"]',
}

export async function resolveClip(page, clip, { padding = 0, maxHeight = 2200 } = {}) {
  if (!clip || clip === 'viewport') return {}

  if (typeof clip === 'function') {
    const out = await clip(page)
    if (!out) return {}
    if (out.locator) return out
    return { clip: out }
  }

  const selector = REGIONS[clip] ?? clip
  if (typeof selector === 'function') return resolveClip(page, selector, { padding, maxHeight })

  const locator = page.locator(selector).first()
  await locator.waitFor({ state: 'visible', timeout: 20_000 })

  // Padding or a height cap means a rectangle rather than the element itself.
  const box = await locator.boundingBox()
  if (!box) return { locator }

  const tall = box.height > maxHeight
  if (!padding && !tall) return { locator }

  const vp = page.viewportSize()
  const rect = {
    x: Math.max(0, box.x - padding),
    y: Math.max(0, box.y - padding),
    width: Math.min(vp.width, box.width + padding * 2),
    height: Math.min(tall ? maxHeight : box.height + padding * 2, box.height + padding * 2),
  }
  return { clip: rect }
}

export async function unionOf(page, ...locators) {
  const boxes = []
  for (const l of locators) {
    const locator = typeof l === 'string' ? page.locator(l) : l
    const n = await locator.count()
    for (let i = 0; i < n; i++) {
      const box = await locator.nth(i).boundingBox()
      if (box && box.width > 1 && box.height > 1) boxes.push(box)
    }
  }
  if (!boxes.length) return null

  const x = Math.min(...boxes.map((b) => b.x))
  const y = Math.min(...boxes.map((b) => b.y))
  return {
    x,
    y,
    width: Math.max(...boxes.map((b) => b.x + b.width)) - x,
    height: Math.max(...boxes.map((b) => b.y + b.height)) - y,
  }
}

/** `unionOf`, grown by `padding` on every side and kept inside the window. */
export function grow(box, padding = 12, viewport = { width: 1440, height: 900 }) {
  if (!box) return null
  const x = Math.max(0, box.x - padding)
  const y = Math.max(0, box.y - padding)
  return {
    x,
    y,
    width: Math.min(viewport.width - x, box.width + padding * 2),
    height: box.height + padding * 2,
  }
}

export async function centre(page, selector) {
  const locator = typeof selector === 'string' ? page.locator(selector).first() : selector
  await locator.waitFor({ state: 'visible', timeout: 20_000 })
  await locator.evaluate((el) => el.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' }))
  await page.waitForTimeout(150)
}
