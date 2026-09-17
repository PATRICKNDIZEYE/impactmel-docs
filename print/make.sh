#!/usr/bin/env bash
#
# make.sh — build branded, role-specific manual PDFs end to end, in Docker.
#
# Everything runs inside one container image (Node for build.mjs, WeasyPrint for
# rendering, poppler for verification), so the result is byte-for-byte the same
# on a Mac and on the server. Nothing but docker and bash is needed on the host.
#
#   ./make.sh                                  # full + viewer, ImpactMEL branding
#   ./make.sh full viewer org_admin            # pick variants
#   THEME=mzfn OUT=out-mzfn ./make.sh full     # client-branded build, its own dir
#   THEME_ARGS='--org-name "Ubuntu Trust" --brand-accent #0f766e --powered-by true' \
#     ./make.sh full                           # ad-hoc tenant
#   NO_VERIFY=1 ./make.sh full                 # skip the poppler checks
#   REBUILD=1 ./make.sh                        # force a docker image rebuild
#
set -euo pipefail

IMAGE="${IMAGE:-impactmel-print:latest}"
THEME="${THEME:-impactmel}"
THEME_ARGS="${THEME_ARGS:-}"
TOC_DEPTH="${TOC_DEPTH:-2}"
OUT="${OUT:-out}"          # output directory, relative to print/

PRINT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOCS_DIR="$(cd "$PRINT_DIR/.." && pwd)"

# Chapter sources, in order. The user-manual chapters are the real content; the
# fixtures directory adds the two contract-demonstration appendices. Drop the
# second --src once every real chapter carries frontmatter and role fences.
SRC_ARGS=(--src /docs/user-manual --src /docs/print/fixtures/chapters)

VARIANTS=("$@")
if [ ${#VARIANTS[@]} -eq 0 ]; then
  VARIANTS=(full viewer)
fi

say() { printf '\n\033[1m==> %s\033[0m\n' "$*"; }

# ------------------------------------------------------------------ image ----

if [ -n "${REBUILD:-}" ] || ! docker image inspect "$IMAGE" >/dev/null 2>&1; then
  say "building $IMAGE"
  docker build -t "$IMAGE" "$PRINT_DIR"
fi

# The whole docs directory is mounted so that relative paths inside
# figures.json (../public/user-manual) and --src (../user-manual) resolve
# exactly as they do on the host. Node deps live at /node_modules in the image.
DOCKER_RUN=(docker run --rm
  -v "$DOCS_DIR":/docs
  -w /docs/print
  -e HOME=/tmp
  "$IMAGE")

# ------------------------------------------------------------------ build -----

mkdir -p "$PRINT_DIR/$OUT"
PDFS=()

# figures.json is generated from user-manual/FIGURES.md, so refresh it first:
# a figure added to the capture list is then usable without a second step.
say "syncing figures.json from FIGURES.md"
"${DOCKER_RUN[@]}" node tools/sync-figures.mjs

for VARIANT in "${VARIANTS[@]}"; do
  say "variant: $VARIANT  (theme: $THEME)"

  # 1. markdown -> print-ready HTML
  # shellcheck disable=SC2086  # THEME_ARGS is intentionally word-split
  "${DOCKER_RUN[@]}" node build.mjs \
    --variant "$VARIANT" \
    --theme "$THEME" \
    --toc-depth "$TOC_DEPTH" \
    "${SRC_ARGS[@]}" \
    --out "$OUT" \
    $THEME_ARGS

  # 2. HTML + CSS Paged Media -> PDF.
  #    WeasyPrint takes the HTML file's own location as the base URL, so the
  #    relative asset/stylesheet hrefs in out/ resolve without extra flags.
  #    Warnings are kept visible on purpose: an "Ignored ..." line is WeasyPrint
  #    telling us it does not support something print.css asked for.
  say "rendering $OUT/manual-$VARIANT.pdf"
  "${DOCKER_RUN[@]}" weasyprint \
    "$OUT/manual-$VARIANT.html" \
    "$OUT/manual-$VARIANT.pdf" 2>&1 | sed 's/^/    /' || {
      echo "    weasyprint failed for $VARIANT" >&2
      exit 1
    }

  PDFS+=("$OUT/manual-$VARIANT.pdf")
done

# ----------------------------------------------------------------- verify -----

if [ -z "${NO_VERIFY:-}" ]; then
  say "verifying with poppler (pdfinfo / pdftotext)"
  "${DOCKER_RUN[@]}" node verify.mjs "${PDFS[@]}"
fi

say "done"
ls -la "$PRINT_DIR/$OUT"/*.pdf
