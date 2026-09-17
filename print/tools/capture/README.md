# Screenshot capture

The manual has 61 figures. Every one of them is a real screenshot of a real
instance holding real-looking data, taken by this harness rather than by hand,
because a manual whose pictures are six releases old is worse than one with no
pictures at all: the reader trusts the picture and then cannot find the button.

    cd print/tools/capture
    node capture.mjs                    # everything, against demo.impactmel.com
    node capture.mjs --only review-      # keys with this prefix
    node capture.mjs --chapter 12        # one chapter's figures
    node capture.mjs --list             # what would be captured, and as whom

Output goes to `../../../public/user-manual/images/<key>.png`, which is where
`print/build.mjs` and the VitePress site both look. A run writes
`capture-report.json` next to the images with, per figure, the URL it ended up
on, the element it shot, the pixel size and how long the recipe took — so a
figure that silently captured an empty state is visible without opening 61
PNGs.

## How a figure is described

`figures/*.mjs` hold recipes. A recipe is the URL, the role to be signed in as,
and the steps that put the screen into the state the caption describes:

```js
{
  key: 'review-send-back',
  chapter: 11,
  as: 'me_officer',
  url: (ctx) => `/org/${ctx.orgId}/review`,
  clip: 'dialog',
  async prepare(page, ctx) {
    await page.getByRole('button', { name: /send back/i }).first().click()
    await page.getByRole('textbox').fill('The August figure looks like July’s.')
  },
}
```

`clip` says what to photograph: a CSS selector, one of the named regions in
`lib/regions.mjs` (`page`, `dialog`, `main`, `topnav`), or a function returning
a bounding box. Nothing is captured full-page by default — a 9,000px column of
dashboard is unreadable at manual size.

## Why it drives the browser instead of mocking

Everything comes from `demo.impactmel.com` signed in as one of the demo
accounts, so a figure can only be captured if the feature actually works for
that role. Three times now a recipe has failed and the cause was the product,
not the recipe. That is the point: this harness is a slow, thorough smoke test
that leaves pictures behind.

It never runs against a client cell. `assertDemoHost()` refuses any host that
is not the demo one unless `--i-know` is passed, because a screenshot of a
client's data belongs in nobody's manual.

## Roles

| Recipe `as` | Demo account | Why it matters |
|---|---|---|
| `org_admin` | director@meridian-demo.org | Settings, members, audit log |
| `me_officer` | nadia.qureshi@meridian-demo.org | Most of the manual: indicators, review, periods |
| `reporter` | farhana.akter@meridian-demo.org | Progress reports, attendance — a reporter sees fewer controls |
| `viewer` | donor.liaison@meridian-demo.org | Read-only surfaces |
| `anon` | — | `/register`, `/login` |

Signed-in state is cached per role in `.auth/<role>.json` so a full run signs
in four times rather than sixty. `--fresh-auth` throws the cache away.
