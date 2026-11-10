# ImpactMEL documentation

Source for [docs.impactmel.com](https://docs.impactmel.com): the user manual, role guides, release notes and video guides for ImpactMEL, plus the printed user guide (PDF). Written against release v0.10.36 and the version 2 interface.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site into .vitepress/dist
```

Pushing to `main` deploys through Vercel. Old URLs are redirected in `vercel.json`; keep them when pages move.

## Layout

| Path | What |
|---|---|
| `introduction.md`, `getting-started/` | What ImpactMEL is; sign up, set-up, invitations, navigation |
| `roles/` | One page per built-in role |
| `manual/` | The user manual, by task |
| `security.md`, `plans.md`, `faq.md`, `release-notes.md` | Reference |
| `videos/` | Video guides (files stream from media.impactmel.com) |
| `public/images/` | Screenshots from the demo workspace (WebP) |
| `scripts/capture/` | Playwright scripts that take the screenshots |
| `print/` | The printed guide: `build-pdf.mjs` and `print.css` |

A paragraph holding only an image renders as a figure; its alt text is the caption.

## Screenshots

Taken from demo.impactmel.com (Meridian Impact Alliance) in light mode at 1440 px, 2x. The flow scripts publish a report and create share links in the demo; the demo resets nightly.

```bash
node scripts/capture/shots-pages.mjs     # plain pages
node scripts/capture/shots-flows.mjs     # dialogs, panels, publish, share links
node scripts/capture/shots-extra.mjs     # public pages, phone form, sign-up, funder
for f in scripts/capture/out/*.png; do cwebp -q 88 -m 6 "$f" -o public/images/$(basename "$f" .png).webp; done
```

## Printed guide

```bash
npm run build && npx vitepress preview --port 4179 &
node print/build-pdf.mjs                 # print/out/ImpactMEL-User-Guide.pdf
cp print/out/ImpactMEL-User-Guide.pdf public/
```

The PDF is printed from the built pages, so it always matches the site.

## Writing

Plain, task-first, British spelling, short sentences. No em dashes. Describe only what the product does today; where something has no screen yet, say so.

Contact: [inquiries@impactmel.com](mailto:inquiries@impactmel.com)
