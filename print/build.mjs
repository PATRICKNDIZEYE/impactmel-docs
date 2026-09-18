#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, copyFileSync } from 'node:fs';
import { dirname, join, resolve, basename, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import { resolveTheme, themeCSS, themeText, THEME_FLAGS, PRESETS } from './theme.mjs';
import { ensurePlaceholder } from './fixtures/make-placeholders.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));

const ROLES = ['viewer', 'reporter', 'me_officer', 'org_admin'];
const VARIANTS = ['full', ...ROLES];

// =========================================================== arguments ======

function parseArgs(argv) {
  const opts = {
    variant: 'full',
    src: [],
    out: 'out',
    tocDepth: 2,
    quiet: false,
    theme: undefined,
  };
  const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--help' || a === '-h') {
      printHelp();
      process.exit(0);
    }
    if (!a.startsWith('--')) throw new Error(`unexpected argument: ${a}`);
    const eq = a.indexOf('=');
    const key = camel((eq === -1 ? a : a.slice(0, eq)).slice(2));
    const value = eq === -1 ? argv[++i] : a.slice(eq + 1);
    if (value === undefined) throw new Error(`missing value for --${key}`);
    if (key === 'src') opts.src.push(value);
    else if (key === 'tocDepth') opts.tocDepth = Number(value);
    else if (key === 'quiet') opts.quiet = value !== 'false';
    else opts[key] = value;
  }

  if (!VARIANTS.includes(opts.variant)) {
    throw new Error(`--variant must be one of: ${VARIANTS.join(', ')} (got "${opts.variant}")`);
  }
  if (!opts.src.length) opts.src = ['../user-manual'];
  if (!Number.isInteger(opts.tocDepth) || opts.tocDepth < 1 || opts.tocDepth > 3) {
    throw new Error('--toc-depth must be 1, 2 or 3');
  }
  return opts;
}

function printHelp() {
  const rows = [
    ['--variant <v>', `one of: ${VARIANTS.join(' | ')} (default full)`],
    ['--src <dir>', 'chapter directory; repeatable, order preserved (default ../user-manual)'],
    ['--out <dir>', 'output directory (default out)'],
    ['--toc-depth <1-3>', 'contents depth: 1 chapters, 2 adds h2, 3 adds h3 (default 2)'],
    ['--quiet', 'suppress the per-chapter log'],
    ['--product-version <v>', 'release the manual was checked against, printed on the cover'],
    ...THEME_FLAGS,
  ];
  const pad = Math.max(...rows.map((r) => r[0].length));
  console.log('\nbuild.mjs — markdown -> print-ready HTML for WeasyPrint\n');
  for (const [flag, help] of rows) console.log(`  ${flag.padEnd(pad)}  ${help}`);
  console.log(`\nthemes: ${Object.keys(PRESETS).join(', ')}\n`);
}

// ======================================================== small helpers =====

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const stripTags = (s) => String(s).replace(/<[^>]*>/g, '');

/** Decode the handful of entities we generate, for plain-text contexts. */
const unent = (s) =>
  String(s)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');

function slugify(s) {
  return unent(stripTags(String(s)))
    .toLowerCase()
    .replace(/[‘’“”]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'section';
}

const titleCase = (slug) =>
  slug.replace(/[-_]+/g, ' ').replace(/\b[a-z]/g, (c) => c.toUpperCase());

function splitCode(md) {
  const segments = [];
  const lines = md.split('\n');
  let buf = [];
  let fence = null; // the opening fence string, when inside a block

  const flush = (code) => {
    if (buf.length) segments.push({ code, text: buf.join('\n') });
    buf = [];
  };

  for (const line of lines) {
    const f = line.match(/^\s*(```+|~~~+)/);
    if (fence) {
      buf.push(line);
      if (f && f[1][0] === fence[0] && f[1].length >= fence.length) {
        flush(true);
        fence = null;
      }
      continue;
    }
    if (f) {
      flush(false);
      fence = f[1];
      buf.push(line);
      continue;
    }
    buf.push(line);
  }
  flush(!!fence);
  return segments;
}

/** Apply `fn` to the markdown outside code blocks and inline code spans. */
function mapOutsideCode(md, fn) {
  return splitCode(md)
    .map((seg) => {
      if (seg.code) return seg.text;
      // Protect inline code spans within prose.
      return seg.text
        .split(/(`[^`\n]*`)/g)
        .map((chunk) => (chunk.startsWith('`') ? chunk : fn(chunk)))
        .join('');
    })
    .join('\n');
}

function replaceBalancedDiv(text, className, transform) {
  const open = new RegExp(`<div class="${className}(?:[^"]*)"[^>]*>`, 'g');
  let out = '';
  let cursor = 0;
  let m;
  while ((m = open.exec(text))) {
    if (m.index < cursor) continue;
    let depth = 1;
    let i = m.index + m[0].length;
    const inner = /<div\b[^>]*>|<\/div>/g;
    inner.lastIndex = i;
    let d;
    let end = -1;
    while ((d = inner.exec(text))) {
      depth += d[0] === '</div>' ? -1 : 1;
      if (depth === 0) {
        end = d.index + d[0].length;
        break;
      }
    }
    if (end === -1) break; // unbalanced; leave the rest alone
    out += text.slice(cursor, m.index) + transform(text.slice(m.index + m[0].length, end - 6));
    cursor = end;
    open.lastIndex = end;
  }
  return out + text.slice(cursor);
}

// ==================================================== frontmatter parsing ===

function parseFrontmatter(raw, ctx) {
  if (!raw.startsWith('---')) return { data: {}, body: raw };
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return { data: {}, body: raw };
  const block = raw.slice(raw.indexOf('\n') + 1, end);
  const body = raw.slice(raw.indexOf('\n', end + 1) + 1);

  const data = {};
  let listKey = null;
  for (const line of block.split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;

    const item = line.match(/^\s*-\s+(.*)$/);
    if (item && listKey) {
      data[listKey].push(dequote(item[1]));
      continue;
    }

    const kv = line.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/);
    if (!kv) {
      warn(`${ctx}: unparsed frontmatter line: ${line.trim()}`);
      continue;
    }
    const [, key, rest] = kv;
    listKey = null;
    if (rest === '') {
      listKey = key;
      data[key] = [];
    } else if (rest.startsWith('[')) {
      data[key] = rest
        .replace(/^\[|\]\s*$/g, '')
        .split(',')
        .map((s) => dequote(s))
        .filter(Boolean);
    } else {
      data[key] = dequote(rest);
    }
  }
  return { data, body };
}

const dequote = (s) => s.trim().replace(/^["']|["']$/g, '').trim();

// ========================================================= role filtering ===

const ROLE_FENCE_OPEN = /^\s*<!--\s*roles:\s*([^->]+?)\s*-->\s*$/;
const ROLE_FENCE_CLOSE = /^\s*<!--\s*\/roles\s*-->\s*$/;

function stripRoleFences(md, variant, ctx) {
  const lines = md.split('\n');
  const out = [];
  /** @type {{roles: string[], keep: boolean}[]} */
  const stack = [];
  let stripped = 0;
  let kept = 0;
  let codeFence = null;

  for (const [n, line] of lines.entries()) {
    // A fence shown inside a code block is documentation, not markup.
    const cf = line.match(/^\s*(```+|~~~+)/);
    if (codeFence) {
      if (cf && cf[1][0] === codeFence[0] && cf[1].length >= codeFence.length) codeFence = null;
      if (stack.every((f) => f.keep)) out.push(line);
      continue;
    }
    if (cf) {
      codeFence = cf[1];
      if (stack.every((f) => f.keep)) out.push(line);
      continue;
    }

    const open = line.match(ROLE_FENCE_OPEN);
    if (open) {
      const roles = open[1]
        .split(',')
        .map((r) => r.trim())
        .filter(Boolean);
      const unknown = roles.filter((r) => !ROLES.includes(r));
      if (unknown.length) warn(`${ctx}:${n + 1}: unknown role(s) in fence: ${unknown.join(', ')}`);
      const parentKeep = stack.length ? stack[stack.length - 1].keep : true;
      const keep = parentKeep && (variant === 'full' || roles.includes(variant));
      stack.push({ roles, keep });
      if (keep) kept++;
      else stripped++;
      continue;
    }
    if (ROLE_FENCE_CLOSE.test(line)) {
      if (!stack.length) warn(`${ctx}:${n + 1}: <!-- /roles --> with no open fence`);
      else stack.pop();
      continue;
    }
    if (stack.every((f) => f.keep)) out.push(line);
  }

  if (stack.length) warn(`${ctx}: ${stack.length} role fence(s) never closed`);
  return { md: out.join('\n'), stripped, kept };
}

// ============================================================== figures =====

function loadFigures() {
  const manifest = JSON.parse(readFileSync(join(HERE, 'figures.json'), 'utf8'));
  return { figures: manifest.figures ?? {}, imageRoots: manifest.imageRoots ?? ['fixtures'] };
}

function makeFigureResolver({ figures, imageRoots }, assets, stats) {
  return (md, ctx) =>
    mapOutsideCode(md, (text) =>
      text.replace(/\{\{figure:\s*([a-z0-9][a-z0-9._-]*)\s*\}\}/gi, (_all, rawKey) => {
        const key = rawKey.trim();
        const entry = figures[key];
        if (!entry) {
          warn(`${ctx}: {{figure:${key}}} is not in figures.json — rendering a placeholder`);
          stats.figuresUnknown.push(key);
        }
        const href = assets.figure(key, entry?.src, imageRoots);
        const title = entry?.title ?? titleCase(key);
        const caption = entry?.caption ?? '';
        stats.figures.push(key);

        return [
          '',
          `<figure class="figure" id="fig-${slugify(key)}">`,
          `  <img class="figure__img" src="${esc(href)}" alt="${esc(title)}">`,
          '  <figcaption class="figure__caption">',
          // A title is optional: most captions from FIGURES.md are complete
          // sentences and read better without a bold lead-in.
          entry?.title ? `    <span class="figure__title">${esc(entry.title)}</span>` : '',
          caption ? `    <span class="figure__desc">${esc(caption)}</span>` : '',
          '  </figcaption>',
          '</figure>',
          '',
        ]
          .filter((l) => l !== '')
          .join('\n');
      })
    );
}

// =============================================================== assets =====

const IMAGE_EXT = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'];

function discoverImage(key, imageRoots) {
  for (const root of imageRoots) {
    const dir = resolve(HERE, root, 'images');
    if (!existsSync(dir)) continue;

    for (const ext of IMAGE_EXT) {
      const direct = join(dir, `${key}.${ext}`);
      if (existsSync(direct)) return direct;
    }

    const numbered = new RegExp(`^\\d+-\\d+-${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\.(${IMAGE_EXT.join('|')})$`, 'i');
    const hit = readdirSync(dir).find((n) => numbered.test(n));
    if (hit) return join(dir, hit);
  }
  return null;
}

/**
 * The brand typefaces print.css declares in @font-face, as `assets/fonts/<file>`
 * relative to out/print.css. They are not referenced from any markdown, so
 * nothing else would copy them and WeasyPrint would silently fall back to
 * Liberation — a manual that looks nothing like the product it documents.
 */
const FONT_FILES = ['Manrope-Variable.ttf', 'SpaceGrotesk-Variable.ttf'];

function copyFonts(outDir) {
  const dir = join(outDir, 'assets', 'fonts');
  mkdirSync(dir, { recursive: true });
  for (const file of FONT_FILES) {
    const src = join(HERE, 'assets', 'fonts', file);
    if (!existsSync(src)) {
      warn(`font "${file}" missing from print/assets/fonts — the PDF will fall back to Liberation`);
      continue;
    }
    copyFileSync(src, join(dir, file));
  }
}

/** Copies every referenced file into out/assets so the HTML is self-contained. */
function makeAssets(outDir, stats) {
  const dir = join(outDir, 'assets');
  mkdirSync(join(dir, 'figures'), { recursive: true });
  mkdirSync(join(dir, 'brand'), { recursive: true });
  const seen = new Map();

  return {
    /** @returns {string} href relative to the output HTML */
    figure(key, src, imageRoots) {
      if (seen.has(key)) return seen.get(key);

      let found = null;
      if (src) {
        // Explicit path in the manifest.
        for (const root of imageRoots) {
          const p = resolve(HERE, root, src);
          if (existsSync(p)) {
            found = p;
            break;
          }
        }
        if (!found) warn(`figure "${key}": src "${src}" not found in any imageRoot`);
      } else {
        found = discoverImage(key, imageRoots);
      }

      // No art yet: stamp a placeholder so the pipeline is testable today.
      if (!found) {
        const p = join(HERE, 'fixtures', `${key}.png`);
        ensurePlaceholder(key, p);
        found = p;
        stats.figuresPlaceholder.push(key);
      }

      const name = `${key}-${basename(found)}`.replace(/[^a-zA-Z0-9._-]/g, '_');
      copyFileSync(found, join(dir, 'figures', name));
      const href = `assets/figures/${name}`;
      seen.set(key, href);
      return href;
    },

    /** @returns {string|null} href, or null when the tenant has no logo file */
    brand(relPath) {
      if (!relPath) return null;
      const p = resolve(HERE, relPath);
      if (!existsSync(p)) {
        warn(`logo "${relPath}" not found — falling back to a typographic wordmark`);
        return null;
      }
      copyFileSync(p, join(dir, 'brand', basename(p)));
      return `assets/brand/${basename(p)}`;
    },
  };
}

const figureKeyFromSrc = (src) =>
  basename(String(src))
    .replace(/\.(png|jpe?g|webp|gif|svg)$/i, '')
    .replace(/^\d+-\d+-/, '');

/** `<figure class="doc-figure">…<ImageModal src=…>…</figure>` -> `{{figure:key}}` */
function adaptDocFigures(md, stats) {
  return md.replace(/<figure class="doc-figure">[\s\S]*?<\/figure>/g, (block) => {
    const src = (block.match(/src="([^"]+)"/) || [])[1];
    if (!src) return '';
    stats.legacy.docFigures++;
    return `\n\n{{figure:${figureKeyFromSrc(src)}}}\n\n`;
  });
}

/** Bare `<ImageModal src=… />` outside a doc-figure wrapper. */
function adaptImageModals(md, stats) {
  return md.replace(/<ImageModal\b[^>]*?src="([^"]+)"[^>]*?\/?>/g, (_m, src) => {
    stats.legacy.imageModals++;
    return `\n\n{{figure:${figureKeyFromSrc(src)}}}\n\n`;
  });
}

function adaptVideos(md, stats, siteBase) {
  const one = (attrs) => {
    const get = (k) => (attrs.match(new RegExp(`${k}="([^"]*)"`)) || [])[1] ?? '';
    const src = get('src');
    const url = src.startsWith('http') ? src : `${siteBase}${src}`;
    stats.legacy.videos++;
    return `  <li class="video-refs__item"><span class="video-refs__title">${esc(
      get('title') || basename(src)
    )}</span>${get('duration') ? `<span class="video-refs__meta">${esc(get('duration'))}</span>` : ''}<span class="video-refs__url">${esc(url)}</span></li>`;
  };

  const collect = (chunk) => {
    const items = [...chunk.matchAll(/<VideoEmbed\b([^>]*?)\/?>/g)].map((m) => one(m[1]));
    if (!items.length) return '';
    return [
      '',
      '<aside class="video-refs">',
      '  <p class="video-refs__label">Watch it done</p>',
      '  <ul class="video-refs__list">',
      ...items,
      '  </ul>',
      '</aside>',
      '',
    ].join('\n');
  };

  let out = replaceBalancedDiv(md, 'video-track__grid', collect);
  // Any stragglers not inside a grid wrapper.
  out = out.replace(/(?:^|\n)((?:\s*<VideoEmbed\b[^>]*?\/?>\s*\n?)+)/g, (_m, chunk) => collect(chunk));
  return out;
}

/** `doc-page-hero` carries real editorial content -> keep it as a lede block. */
function adaptHero(md, stats) {
  return replaceBalancedDiv(md, 'doc-page-hero', (inner) => {
    const pick = (cls) => {
      const m = inner.match(new RegExp(`class="${cls}"[^>]*>([\\s\\S]*?)<\\/p>`));
      return m ? m[1].replace(/\s+/g, ' ').trim() : '';
    };
    const meta = [...inner.matchAll(/doc-page-hero__meta-item"[^>]*>([\s\S]*?)<\/div>/g)].map((m) => {
      const label = (m[1].match(/<span>([\s\S]*?)<\/span>/) || [])[1]?.trim() ?? '';
      const value = (m[1].match(/<strong>([\s\S]*?)<\/strong>/) || [])[1]?.trim() ?? '';
      return { label, value };
    });
    stats.legacy.heroes++;

    return [
      '',
      '<section class="lede">',
      pick('doc-page-hero__eyebrow') ? `  <p class="lede__eyebrow">${pick('doc-page-hero__eyebrow')}</p>` : '',
      pick('doc-page-hero__title') ? `  <p class="lede__title">${pick('doc-page-hero__title')}</p>` : '',
      pick('doc-page-hero__copy') ? `  <p class="lede__copy">${pick('doc-page-hero__copy')}</p>` : '',
      meta.length ? '  <dl class="lede__meta">' : '',
      ...meta.flatMap((m) => [
        `    <dt>${m.label}</dt>`,
        `    <dd>${m.value}</dd>`,
      ]),
      meta.length ? '  </dl>' : '',
      '</section>',
      '',
    ]
      .filter((l) => l !== '')
      .join('\n');
  });
}

function dropQuickLinks(md, stats) {
  return replaceBalancedDiv(md, 'doc-quick-links', () => {
    stats.legacy.quickLinks++;
    return '';
  });
}

// ===================================================== vitepress callouts ===

const CALLOUT_LABELS = { tip: 'Tip', info: 'Note', note: 'Note', warning: 'Important', danger: 'Warning', caution: 'Warning' };

function markCallouts(md) {
  const out = [];
  const stack = [];
  let codeFence = null;
  for (const line of md.split('\n')) {
    const cf = line.match(/^\s*(```+|~~~+)/);
    if (codeFence) {
      if (cf && cf[1][0] === codeFence[0] && cf[1].length >= codeFence.length) codeFence = null;
      out.push(line);
      continue;
    }
    if (cf) {
      codeFence = cf[1];
      out.push(line);
      continue;
    }

    const open = line.match(/^:::\s*(tip|info|note|warning|danger|caution)\s*(.*)$/);
    if (open) {
      stack.push(true);
      out.push('', `@@callout-open:${open[1]}:${open[2].trim()}@@`, '');
      continue;
    }
    if (/^:::\s*$/.test(line) && stack.length) {
      stack.pop();
      out.push('', '@@callout-close@@', '');
      continue;
    }
    out.push(line);
  }
  return out.join('\n');
}

function renderCallouts(html, stats) {
  return html
    .replace(/<p>@@callout-open:([a-z]+):([^@]*)@@<\/p>/g, (_m, kind, title) => {
      stats.callouts++;
      const label = title || CALLOUT_LABELS[kind] || titleCase(kind);
      return `<aside class="callout callout--${kind}"><p class="callout__label">${esc(label)}</p>`;
    })
    .replace(/<p>@@callout-close@@<\/p>/g, '</aside>');
}

// ============================================== HTML post-processing ========

function addHeadingIds(html, slug, tocDepth, toc) {
  const used = new Set();
  return html.replace(/<h([1-6])>([\s\S]*?)<\/h\1>/g, (_m, lvl, inner) => {
    const level = Number(lvl);
    let id = `${slug}--${slugify(inner)}`;
    let n = 2;
    while (used.has(id)) id = `${slug}--${slugify(inner)}-${n++}`;
    used.add(id);

    const text = unent(stripTags(inner)).trim();
    // TOC levels: 1 = chapter title, 2 = <h2>, 3 = <h3>. So --toc-depth 1 is
    // chapters only, 2 adds <h2>, 3 adds <h3>.
    if (level >= 2 && level <= tocDepth) toc.push({ level, id, text });
    return `<h${lvl} id="${id}" class="h${lvl}">${inner}</h${lvl}>`;
  });
}

function rewriteLinks(html, slug, included, stats) {
  return html.replace(/<a href="([^"]+)"([^>]*)>([\s\S]*?)<\/a>/g, (all, href, attrs, text) => {
    const plain = unent(stripTags(text)).trim();

    const internal = href.match(/^\/user-manual\/([a-z0-9-]+)\/?(#.*)?$/i);
    if (internal) {
      const target = internal[1];
      if (!included.has(target)) {
        stats.xrefsDropped.push(`${slug} -> ${target}`);
        return `<span class="xref-dropped">${text}</span>`;
      }
      stats.xrefs++;
      const anchor = internal[2] ? `${target}--${internal[2].slice(1)}` : `ch-${target}`;
      return `<a class="xref" href="#${anchor}">${text}</a>`;
    }

    if (href.startsWith('#')) {
      stats.xrefs++;
      return `<a class="xref" href="#${slug}--${href.slice(1)}">${text}</a>`;
    }

    if (/^https?:\/\//i.test(href)) {
      const bare = href.replace(/^https?:\/\//i, '').replace(/\/$/, '');
      const showUrl = plain.toLowerCase() !== bare.toLowerCase() && plain.toLowerCase() !== href.toLowerCase();
      return `<a class="link${showUrl ? ' link--show-url' : ''}" href="${esc(href)}"${attrs}>${text}</a>`;
    }

    // Anything else (mailto:, relative doc paths we do not recognise).
    return all;
  });
}

/** Tables get a wrapper so break control and zebra striping have something to hold. */
const wrapTables = (html) =>
  html.replace(/<table>/g, '<div class="table-wrap"><table class="table">').replace(/<\/table>/g, '</table></div>');

const dropRulesBeforeHeadings = (html) => html.replace(/<hr\s*\/?>\s*(?=<h[1-3]\b)/g, '');

// ================================================== chapter assembly =======

function discoverChapters(srcDirs, exclude = []) {
  const skip = new Set(['readme.md', ...exclude.map((e) => e.toLowerCase())]);
  const files = [];
  for (const dir of srcDirs) {
    const abs = resolve(HERE, dir);
    if (!existsSync(abs)) {
      warn(`--src "${dir}" does not exist; skipping`);
      continue;
    }
    for (const name of readdirSync(abs).sort()) {
      if (!name.endsWith('.md')) continue;
      if (skip.has(name.toLowerCase())) continue;
      files.push({ path: join(abs, name), slug: basename(name, '.md').replace(/^\d+-/, ''), dir });
    }
  }
  return files;
}

function loadOrderConfig() {
  const p = join(HERE, 'chapters.json');
  if (!existsSync(p)) return { order: [] };
  return JSON.parse(readFileSync(p, 'utf8'));
}

// ============================================================= rendering ====

function renderTOC(entries, tocDepth) {
  const rows = entries.map((e) => {
    const cls = `toc__row toc__row--l${e.level}`;
    const num = e.level === 1 ? `<span class="toc__num">${e.chapterNumber}</span>` : '';
    return `    <li class="${cls}"><a class="toc__link" href="#${e.id}">${num}<span class="toc__text">${esc(
      e.text
    )}</span></a></li>`;
  });
  return [
    '<section class="toc-section">',
    '  <h1 class="toc__heading">Contents</h1>',
    `  <ol class="toc" data-depth="${tocDepth}">`,
    ...rows,
    '  </ol>',
    '</section>',
  ].join('\n');
}

function renderCover(text, logoHref, variant, buildDate, productVersion) {
  return [
    '<section class="cover">',
    '  <div class="cover__mark">',
    // With a logo: mark + name beside it. Without one: a typographic wordmark,
    // which already *is* the name, so the name is not repeated next to it.
    logoHref
      ? `    <img class="cover__logo" src="${esc(logoHref)}" alt="${esc(text.orgName)}">`
      : `    <span class="cover__wordmark">${esc(text.orgName)}</span>`,
    logoHref ? `    <span class="cover__org">${esc(text.orgName)}</span>` : '',
    '  </div>',
    '  <div class="cover__block">',
    `    <h1 class="cover__title">${esc(text.docTitle)}</h1>`,
    text.docSubtitle ? `    <p class="cover__subtitle">${esc(text.docSubtitle)}</p>` : '',
    `    <p class="cover__variant">${esc(text.variantLabel)}</p>`,
    // Which release the screenshots and the wording were checked against. A
    // reader who cannot tell that cannot tell whether the manual is stale.
    productVersion
      ? `    <p class="cover__release">Describes ImpactMEL ${esc(productVersion)}</p>`
      : '',
    '  </div>',
    '  <div class="cover__foot">',
    `    <p class="cover__date">${esc(buildDate)}</p>`,
    text.footerNote ? `    <p class="cover__note">${esc(text.footerNote)}</p>` : '',
    '    <p class="cover__powered">Powered by ImpactMEL</p>',
    '  </div>',
    '</section>',
  ]
    .filter((l) => l !== '')
    .join('\n');
}

function renderDocument({ themeBlock, text, cover, toc, chapters, variant, themeKey }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(text.docTitle)} — ${esc(text.variantLabel)}</title>
<meta name="description" content="${esc(text.docSubtitle ?? '')}">
<meta name="generator" content="impactmel-docs/print (WeasyPrint, CSS Paged Media)">
<!-- print.css owns all page furniture; the theme block below only supplies
     custom properties, so one stylesheet serves every tenant. -->
<link rel="stylesheet" href="print.css">
<style>
${themeBlock}
</style>
</head>
<body class="variant-${variant} theme-${themeKey}">
${cover}
${toc}
<main class="doc">
${chapters}
</main>
</body>
</html>
`;
}

// ================================================================= main =====

const warnings = [];
function warn(msg) {
  warnings.push(msg);
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const variant = opts.variant;
  const outDir = resolve(HERE, opts.out);
  mkdirSync(outDir, { recursive: true });

  const stats = {
    variant,
    chaptersIncluded: [],
    chaptersDropped: [],
    roleBlocksStripped: 0,
    roleBlocksKept: 0,
    figures: [],
    figuresPlaceholder: [],
    figuresUnknown: [],
    callouts: 0,
    xrefs: 0,
    xrefsDropped: [],
    legacy: { docFigures: 0, imageModals: 0, videos: 0, heroes: 0, quickLinks: 0 },
  };

  const theme = resolveTheme(opts);
  const text = themeText(theme, variant);
  const assets = makeAssets(outDir, stats);
  const manifest = loadFigures();
  const resolveFigures = makeFigureResolver(manifest, assets, stats);
  const orderCfg = loadOrderConfig();

  marked.setOptions({ gfm: true, breaks: false, mangle: false, headerIds: false });

  // ---- pass 1: read, parse frontmatter, decide inclusion --------------------
  const files = discoverChapters(opts.src, orderCfg.exclude ?? []);
  if (!files.length) throw new Error(`no .md chapters found in: ${opts.src.join(', ')}`);
  stats.excluded = orderCfg.exclude ?? [];

  const orderIndex = new Map(orderCfg.order?.map((o, i) => [o.slug, i]) ?? []);
  const orderRoles = new Map(orderCfg.order?.map((o) => [o.slug, o.roles]) ?? []);

  const docs = [];
  for (const f of files) {
    const raw = readFileSync(f.path, 'utf8');
    const ctx = relative(HERE, f.path);
    const { data, body } = parseFrontmatter(raw, ctx);

    // Title: frontmatter wins, then the leading H1, then the filename.
    const h1 = body.match(/^\s*#\s+(.+?)\s*$/m);
    const title = data.title || (h1 && h1[1].trim()) || titleCase(f.slug);

    // Roles: frontmatter wins, then chapters.json, then "everyone".
    let roles = Array.isArray(data.roles) ? data.roles : orderRoles.get(f.slug);
    if (!roles) {
      warn(`${ctx}: no roles in frontmatter or chapters.json — including in every variant`);
      roles = [...ROLES];
    }
    const badRoles = roles.filter((r) => !ROLES.includes(r));
    if (badRoles.length) warn(`${ctx}: unknown role(s) ${badRoles.join(', ')}`);

    // Order: frontmatter `chapter:` wins, then chapters.json position, then
    // alphabetical after everything that is explicitly ordered.
    const order = data.chapter !== undefined ? Number(data.chapter) : orderIndex.has(f.slug) ? orderIndex.get(f.slug) : 1000;

    docs.push({ ...f, ctx, title, roles, order, body, data });
  }

  docs.sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));

  const kept = docs.filter((d) => variant === 'full' || d.roles.includes(variant));
  for (const d of docs) {
    (kept.includes(d) ? stats.chaptersIncluded : stats.chaptersDropped).push(d.slug);
  }
  if (!kept.length) throw new Error(`variant "${variant}" excludes every chapter`);

  const included = new Set(kept.map((d) => d.slug));

  // ---- pass 2: transform each chapter --------------------------------------
  const toc = [];
  const rendered = [];

  for (const [i, d] of kept.entries()) {
    const chapterNumber = i + 1;
    let md = d.body;

    // Role fences first: everything after this point sees only content the
    // variant is entitled to, so figure and video counts stay honest.
    const fence = stripRoleFences(md, variant, d.ctx);
    md = fence.md;
    stats.roleBlocksStripped += fence.stripped;
    stats.roleBlocksKept += fence.kept;

    // The chapter opener renders the title, so drop the leading H1.
    md = md.replace(/^\s*#\s+.+?\s*$/m, '');

    // --- legacy adapters (delete once the rewrite lands) ---
    md = dropQuickLinks(md, stats);
    md = adaptHero(md, stats);
    md = adaptDocFigures(md, stats);
    md = adaptImageModals(md, stats);
    md = adaptVideos(md, stats, 'https://docs.impactmel.com');
    // --- end legacy adapters ---

    md = resolveFigures(md, d.ctx);
    md = markCallouts(md);

    // Headings are collected per chapter, then tagged with the chapter number
    // so the table of contents can show "4  Programs" style numbering.
    const chapterToc = [];
    let html = marked.parse(md);
    html = renderCallouts(html, stats);
    html = addHeadingIds(html, d.slug, opts.tocDepth, chapterToc);
    html = rewriteLinks(html, d.slug, included, stats);
    html = wrapTables(html);
    html = dropRulesBeforeHeadings(html);

    toc.push({ level: 1, id: `ch-${d.slug}`, text: d.title, chapterNumber });
    for (const e of chapterToc) toc.push({ ...e, chapterNumber });

    rendered.push(
      [
        `<section class="chapter" id="ch-${d.slug}" data-slug="${esc(d.slug)}">`,
        '  <header class="chapter__opener">',
        '    <p class="chapter__eyebrow">Chapter</p>',
        `    <h1 class="chapter__title">${esc(d.title)}</h1>`,
        `    <p class="chapter__roles">${esc(d.roles.map(roleLabel).join(' · '))}</p>`,
        '  </header>',
        html.trim(),
        '</section>',
      ].join('\n')
    );

    if (!opts.quiet) {
      console.log(
        `  ${String(chapterNumber).padStart(2)}. ${d.slug.padEnd(20)} ${String(fence.stripped).padStart(2)} fence(s) stripped`
      );
    }
  }

  // ---- assemble ------------------------------------------------------------
  const logoHref = assets.brand(theme.logo);
  const buildDate = new Date().toISOString().slice(0, 10);
  const themeBlock = themeCSS(theme, { variant, logoHref, buildDate });

  const html = renderDocument({
    themeBlock,
    text,
    cover: renderCover(text, logoHref, variant, buildDate, opts.productVersion),
    toc: renderTOC(toc, opts.tocDepth),
    chapters: rendered.join('\n\n'),
    variant,
    themeKey: theme.key,
  });

  const htmlPath = join(outDir, `manual-${variant}.html`);
  writeFileSync(htmlPath, html);
  copyFileSync(join(HERE, 'print.css'), join(outDir, 'print.css'));
  copyFonts(outDir);

  stats.tocEntries = toc.length;
  // The full contents list, so verify.mjs can confirm the PDF contains exactly
  // the entries the build emitted rather than guessing levels from the layout.
  stats.toc = toc.map((e) => ({ level: e.level, text: e.text, chapter: e.chapterNumber }));
  // Recorded so verify.mjs can check the running header without hard-coding a
  // tenant name.
  stats.theme = theme.key;
  stats.orgName = theme.orgName;
  stats.docTitle = theme.docTitle;
  stats.warnings = warnings;
  stats.html = relative(HERE, htmlPath);
  writeFileSync(join(outDir, `manual-${variant}.build.json`), JSON.stringify(stats, null, 2) + '\n');

  if (!opts.quiet) {
    console.log(`\n[build] variant=${variant} theme=${theme.key}`);
    console.log(`        chapters: ${stats.chaptersIncluded.length} in, ${stats.chaptersDropped.length} dropped${stats.chaptersDropped.length ? ` (${stats.chaptersDropped.join(', ')})` : ''}`);
    console.log(`        role-fenced blocks: ${stats.roleBlocksKept} kept, ${stats.roleBlocksStripped} stripped`);
    console.log(`        figures: ${stats.figures.length} (${stats.figuresPlaceholder.length} placeholder)`);
    console.log(`        toc entries: ${stats.tocEntries}   xrefs: ${stats.xrefs} (${stats.xrefsDropped.length} de-linked)`);
    console.log(`        -> ${stats.html}`);
    if (warnings.length) {
      console.log(`\n[build] ${warnings.length} warning(s):`);
      for (const w of [...new Set(warnings)].slice(0, 20)) console.log(`        ! ${w}`);
    }
  }
}

const ROLE_LABELS = { viewer: 'Viewer', reporter: 'Reporter', me_officer: 'M&E Officer', org_admin: 'Org Admin' };
const roleLabel = (r) => ROLE_LABELS[r] ?? r;

main().catch((err) => {
  console.error(`\n[build] FAILED: ${err.message}\n`);
  process.exit(1);
});
