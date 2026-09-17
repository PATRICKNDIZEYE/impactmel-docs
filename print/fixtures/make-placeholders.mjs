import { deflateSync } from 'node:zlib';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

// ---------------------------------------------------------------- 5x7 font ---

const GLYPHS = {
  A: '.###.,#...#,#...#,#####,#...#,#...#,#...#',
  B: '####.,#...#,#...#,####.,#...#,#...#,####.',
  C: '.###.,#...#,#....,#....,#....,#...#,.###.',
  D: '####.,#...#,#...#,#...#,#...#,#...#,####.',
  E: '#####,#....,#....,####.,#....,#....,#####',
  F: '#####,#....,#....,####.,#....,#....,#....',
  G: '.###.,#...#,#....,#.###,#...#,#...#,.###.',
  H: '#...#,#...#,#...#,#####,#...#,#...#,#...#',
  I: '#####,..#..,..#..,..#..,..#..,..#..,#####',
  J: '#####,....#,....#,....#,....#,#...#,.###.',
  K: '#...#,#..#.,#.#..,##...,#.#..,#..#.,#...#',
  L: '#....,#....,#....,#....,#....,#....,#####',
  M: '#...#,##.##,#.#.#,#...#,#...#,#...#,#...#',
  N: '#...#,##..#,#.#.#,#..##,#...#,#...#,#...#',
  O: '.###.,#...#,#...#,#...#,#...#,#...#,.###.',
  P: '####.,#...#,#...#,####.,#....,#....,#....',
  Q: '.###.,#...#,#...#,#...#,#.#.#,#..##,.####',
  R: '####.,#...#,#...#,####.,#.#..,#..#.,#...#',
  S: '.####,#....,#....,.###.,....#,....#,####.',
  T: '#####,..#..,..#..,..#..,..#..,..#..,..#..',
  U: '#...#,#...#,#...#,#...#,#...#,#...#,.###.',
  V: '#...#,#...#,#...#,#...#,#...#,.#.#.,..#..',
  W: '#...#,#...#,#...#,#...#,#.#.#,##.##,#...#',
  X: '#...#,#...#,.#.#.,..#..,.#.#.,#...#,#...#',
  Y: '#...#,#...#,.#.#.,..#..,..#..,..#..,..#..',
  Z: '#####,....#,...#.,..#..,.#...,#....,#####',
  0: '.###.,#...#,#..##,#.#.#,##..#,#...#,.###.',
  1: '..#..,.##..,..#..,..#..,..#..,..#..,#####',
  2: '.###.,#...#,....#,...#.,..#..,.#...,#####',
  3: '#####,...#.,..#..,...#.,....#,#...#,.###.',
  4: '...#.,..##.,.#.#.,#..#.,#####,...#.,...#.',
  5: '#####,#....,####.,....#,....#,#...#,####.',
  6: '..##.,.#...,#....,####.,#...#,#...#,.###.',
  7: '#####,....#,...#.,..#..,.#...,.#...,.#...',
  8: '.###.,#...#,#...#,.###.,#...#,#...#,.###.',
  9: '.###.,#...#,#...#,.####,....#,...#.,.##..',
  '-': '.....,.....,.....,#####,.....,.....,.....',
  '_': '.....,.....,.....,.....,.....,.....,#####',
  '.': '.....,.....,.....,.....,.....,.##..,.##..',
  ':': '.....,.##..,.##..,.....,.##..,.##..,.....',
  '/': '....#,...#.,...#.,..#..,.#...,.#...,#....',
  ' ': '.....,.....,.....,.....,.....,.....,.....',
};

const GLYPH_W = 5;
const GLYPH_H = 7;

const glyphRows = (ch) => (GLYPHS[ch] ?? GLYPHS['-']).split(',');

// ------------------------------------------------------------------ canvas ---

function createCanvas(width, height, [r, g, b]) {
  const px = Buffer.alloc(width * height * 3);
  for (let i = 0; i < px.length; i += 3) {
    px[i] = r;
    px[i + 1] = g;
    px[i + 2] = b;
  }
  return { width, height, px };
}

function setPixel(c, x, y, [r, g, b]) {
  if (x < 0 || y < 0 || x >= c.width || y >= c.height) return;
  const o = (y * c.width + x) * 3;
  c.px[o] = r;
  c.px[o + 1] = g;
  c.px[o + 2] = b;
}

function fillRect(c, x0, y0, w, h, colour) {
  for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) setPixel(c, x, y, colour);
}

function strokeRect(c, x0, y0, w, h, thickness, colour) {
  fillRect(c, x0, y0, w, thickness, colour);
  fillRect(c, x0, y0 + h - thickness, w, thickness, colour);
  fillRect(c, x0, y0, thickness, h, colour);
  fillRect(c, x0 + w - thickness, y0, thickness, h, colour);
}

function textWidth(text, scale, tracking) {
  return text.length * (GLYPH_W * scale + tracking) - tracking;
}

function drawText(c, text, x0, y0, scale, colour, tracking = scale) {
  let x = x0;
  for (const ch of text.toUpperCase()) {
    const rows = glyphRows(ch);
    for (let ry = 0; ry < GLYPH_H; ry++) {
      for (let rx = 0; rx < GLYPH_W; rx++) {
        if (rows[ry][rx] !== '#') continue;
        fillRect(c, x + rx * scale, y0 + ry * scale, scale, scale, colour);
      }
    }
    x += GLYPH_W * scale + tracking;
  }
}

/** Greedy wrap on '-' and ' ' so long figure keys stay inside the frame. */
function wrapKey(text, maxChars) {
  const words = text.split(/(?<=-)/);
  const lines = [];
  let line = '';
  for (const w of words) {
    if (line.length + w.length > maxChars && line) {
      lines.push(line);
      line = w;
    } else {
      line += w;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [text];
}

// --------------------------------------------------------------------- PNG ---

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'latin1'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePNG({ width, height, px }) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // colour type: truecolour RGB
  // 10,11,12 = deflate / adaptive filtering / no interlace, all zero

  // Raw scanlines, each prefixed with filter type 0 (None).
  const stride = width * 3;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0;
    px.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// ------------------------------------------------------------------ public ---

const PALETTE = {
  bg: [0xe4, 0xe5, 0xe1],
  frame: [0x9a, 0x9d, 0x95],
  chrome: [0xd2, 0xd4, 0xce],
  ink: [0x5a, 0x5e, 0x55],
  faint: [0x83, 0x87, 0x7d],
};

export function renderPlaceholder(key, opts = {}) {
  const width = opts.width ?? 1280;
  const height = opts.height ?? 800;
  const c = createCanvas(width, height, PALETTE.bg);

  // Frame + a fake window chrome bar, so it reads as "screenshot pending"
  // rather than "broken image".
  strokeRect(c, 0, 0, width, height, 4, PALETTE.frame);
  fillRect(c, 4, 4, width - 8, 56, PALETTE.chrome);
  fillRect(c, 4, 58, width - 8, 2, PALETTE.frame);
  for (let i = 0; i < 3; i++) fillRect(c, 26 + i * 30, 24, 14, 14, PALETTE.faint);

  drawText(c, 'PLACEHOLDER', 96, 24, 2, PALETTE.ink, 2);

  // Diagonal hatch, light, to make it obvious this is not final art.
  for (let d = -height; d < width; d += 48) {
    for (let y = 64; y < height - 4; y++) {
      const x = d + y;
      if (x > 4 && x < width - 4) setPixel(c, x, y, PALETTE.chrome);
    }
  }

  // The key itself, centred, wrapped.
  const scale = 5;
  const tracking = 4;
  const lines = wrapKey(key, 22);
  const lineH = GLYPH_H * scale + 18;
  let y = Math.round((height + 60) / 2 - (lines.length * lineH) / 2);
  for (const line of lines) {
    const w = textWidth(line, scale, tracking);
    const x = Math.round((width - w) / 2);
    fillRect(c, x - 18, y - 14, w + 36, GLYPH_H * scale + 28, PALETTE.bg);
    drawText(c, line, x, y, scale, PALETTE.ink, tracking);
    y += lineH;
  }

  const foot = 'SCREENSHOT PENDING RECAPTURE';
  const fw = textWidth(foot, 2, 2);
  fillRect(c, Math.round((width - fw) / 2) - 12, height - 60, fw + 24, GLYPH_H * 2 + 16, PALETTE.bg);
  drawText(c, foot, Math.round((width - fw) / 2), height - 52, 2, PALETTE.faint, 2);

  return encodePNG(c);
}

/** Write a placeholder to disk unless it is already there. */
export function ensurePlaceholder(key, outPath, { force = false } = {}) {
  if (!force && existsSync(outPath)) return false;
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, renderPlaceholder(key));
  return true;
}

// ------------------------------------------------------------------- CLI -----

if (import.meta.url === `file://${process.argv[1]}`) {
  const { fileURLToPath } = await import('node:url');
  const here = dirname(fileURLToPath(import.meta.url));
  const force = process.argv.includes('--force');
  const { readFileSync } = await import('node:fs');
  const manifest = JSON.parse(readFileSync(join(here, '..', 'figures.json'), 'utf8'));

  let written = 0;
  for (const [key, entry] of Object.entries(manifest.figures)) {
    const name = entry.placeholder ?? `${key}.png`;
    if (ensurePlaceholder(key, join(here, name), { force })) written++;
  }
  console.log(`[fixtures] ${written} placeholder PNG(s) written to ${here}`);
}
