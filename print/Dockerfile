# WeasyPrint + Node + poppler, in one small image.
#
# Why one image: build.mjs (Node) and weasyprint (Python) and the pdftotext/pdfinfo
# verification step all run in the same container, so `make.sh` is a single
# `docker run` and behaves identically on macOS and on the server.
FROM python:3.12-slim-bookworm

ENV DEBIAN_FRONTEND=noninteractive \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1

# - libpango / libharfbuzz / libgdk-pixbuf: WeasyPrint's text + raster stack
# - poppler-utils: pdfinfo / pdftotext for verification
# - nodejs + npm: build.mjs
# - fonts: Liberation (Helvetica/Times metric-compatible), DejaVu, Noto for
#   dashes, arrows and other symbols the manual uses.
RUN apt-get update && apt-get install --no-install-recommends -y \
      libpango-1.0-0 \
      libpangoft2-1.0-0 \
      libharfbuzz0b \
      libfribidi0 \
      libgdk-pixbuf-2.0-0 \
      libffi8 \
      libjpeg62-turbo \
      libopenjp2-7 \
      shared-mime-info \
      fonts-liberation2 \
      fonts-dejavu-core \
      fonts-noto-core \
      poppler-utils \
      nodejs \
      npm \
    && rm -rf /var/lib/apt/lists/*

RUN pip install "weasyprint==66.0" "pydyf==0.11.0"

# Node deps live at / so that ESM resolution from /work/build.mjs walks
# /work/node_modules -> /node_modules and finds them. This keeps the mounted
# host directory free of a node_modules tree.
COPY package.json /package.json
RUN npm install --omit=dev --no-audit --no-fund && rm -f /package-lock.json

WORKDIR /work

RUN weasyprint --version && node --version && pdfinfo -v 2>&1 | head -1
