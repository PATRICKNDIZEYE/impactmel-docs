// A paragraph holding only an image becomes a numbered-ready <figure>; the alt text is the caption.
export function figures(md: any) {
  md.core.ruler.push('figures', (state: any) => {
    const t = state.tokens
    for (let i = 0; i < t.length - 2; i++) {
      if (t[i].type !== 'paragraph_open' || t[i + 2].type !== 'paragraph_close') continue
      const inline = t[i + 1]
      const kids = (inline.children || []).filter((c: any) => !(c.type === 'text' && !c.content.trim()))
      if (kids.length !== 1 || kids[0].type !== 'image') continue
      const img = kids[0]
      const src = img.attrGet('src') || ''
      const alt = img.children?.map((c: any) => c.content).join('') || img.content || ''
      const phone = /phone/.test(src) ? ' figure--phone' : ''
      t[i].type = 'html_block'
      t[i].content = `<figure class="shot${phone}"><img src="${src}" alt="${md.utils.escapeHtml(alt)}" loading="lazy"><figcaption>${md.utils.escapeHtml(alt)}</figcaption></figure>\n`
      t[i + 1].type = 'html_block'
      t[i + 1].content = ''
      t[i + 1].children = []
      t[i + 2].type = 'html_block'
      t[i + 2].content = ''
    }
  })
}
