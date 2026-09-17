/**
 * theme.mjs — per-tenant branding for the print pipeline.
 *
 * Emits a block of CSS custom properties that print.css consumes. Nothing in
 * print.css hard-codes a colour, an organisation name or a logo, so one source
 * tree produces an ImpactMEL-branded manual or a client-branded manual purely
 * from build arguments.
 *
 * Two kinds of property are emitted:
 *   - colours / lengths, used normally
 *   - CSS *strings* (--org-name, --powered-by-text, ...) which print.css uses
 *     inside `content:` in @page margin boxes. WeasyPrint 66 resolves var()
 *     inside margin-box content, which is what makes the running header
 *     brandable without generating per-tenant CSS rules. (Verified; see the
 *     capability notes in README-less form at the bottom of this file.)
 *
 * Presets are a convenience. Every field can be overridden per build, e.g.
 *   node build.mjs --theme mzfn --org-name "Mzansi Foundation" --brand-accent "#0f766e"
 */

// --------------------------------------------------------------- presets ---

/** @typedef {ReturnType<typeof resolveTheme>} Theme */

export const PRESETS = {
  /** ImpactMEL's own branding: olive-black platform colour, lime accent. */
  impactmel: {
    key: 'impactmel',
    orgName: 'ImpactMEL',
    docTitle: 'ImpactMEL User Manual',
    docSubtitle: 'Monitoring, Evaluation and Learning platform',
    platformPrimary: '#14170f',
    brandAccent: '#aec42d',
    paper: '#ffffff',
    logo: 'brand/impactmel-mark.svg',
    poweredBy: false,
    footerNote: 'ImpactMEL — internal and client documentation',
  },

  /**
   * Client tenant example. A white-labelled build: the client's name and
   * colours lead, and "powered by ImpactMEL" is shown because the platform
   * brand is no longer the primary one.
   */
  mzfn: {
    key: 'mzfn',
    orgName: 'MZFN',
    docTitle: 'MZFN Monitoring & Evaluation Manual',
    docSubtitle: 'Programme reporting handbook',
    platformPrimary: '#123b2e',
    brandAccent: '#c8a24a',
    paper: '#ffffff',
    logo: 'brand/mzfn-mark.svg',
    poweredBy: true,
    footerNote: 'MZFN — confidential',
  },
};

export const DEFAULT_THEME = 'impactmel';

/** Human-readable variant labels for the cover page. */
export const VARIANT_LABELS = {
  full: 'Complete edition — all roles',
  org_admin: 'Organisation Administrator edition',
  me_officer: 'M&E Officer edition',
  reporter: 'Reporter edition',
  viewer: 'Viewer edition',
};

// ------------------------------------------------------- colour helpers ---

const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)));

function parseHex(hex) {
  const h = String(hex).trim().replace(/^#/, '');
  const full = h.length === 3 ? [...h].map((c) => c + c).join('') : h;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) throw new Error(`theme: not a hex colour: ${hex}`);
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
}

const toHex = (rgb) => '#' + rgb.map((c) => clamp(c).toString(16).padStart(2, '0')).join('');

/** Linear mix: t=0 -> a, t=1 -> b. */
function mix(a, b, t) {
  const [ar, ag, ab] = parseHex(a);
  const [br, bg, bb] = parseHex(b);
  return toHex([ar + (br - ar) * t, ag + (bg - ag) * t, ab + (bb - ab) * t]);
}

/** Relative luminance, for picking legible text on top of a brand colour. */
function luminance(hex) {
  const srgb = parseHex(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

/** Black or white, whichever has more contrast against `hex`. */
const onColour = (hex) => (luminance(hex) > 0.45 ? '#14170f' : '#ffffff');

/** Escape a JS string for use as a CSS <string> token. */
const cssString = (s) => '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';

// ------------------------------------------------------------- resolving ---

/**
 * Build a theme from a preset plus overrides.
 * @param {object} overrides camelCase keys matching PRESETS entries
 */
export function resolveTheme(overrides = {}) {
  const presetKey = overrides.theme ?? DEFAULT_THEME;
  const preset = PRESETS[presetKey];
  if (!preset) {
    throw new Error(
      `theme: unknown preset "${presetKey}". Known: ${Object.keys(PRESETS).join(', ')}`
    );
  }

  const t = { ...preset };
  for (const k of Object.keys(preset)) {
    if (overrides[k] !== undefined && overrides[k] !== null) t[k] = overrides[k];
  }
  if (overrides.theme) t.key = overrides.theme;

  // Validate the colours early: a typo in a build argument should fail here,
  // not silently produce an unbranded PDF.
  parseHex(t.platformPrimary);
  parseHex(t.brandAccent);
  parseHex(t.paper);

  t.poweredBy = t.poweredBy === true || t.poweredBy === 'true';
  return t;
}

// ------------------------------------------------------------ CSS output ---

/**
 * @param {Theme} t
 * @param {{variant: string, logoHref: string|null, buildDate: string}} ctx
 * @returns {string} a `:root { ... }` block
 */
export function themeCSS(t, ctx = {}) {
  const { platformPrimary: primary, brandAccent: accent, paper } = t;

  const vars = {
    // --- identity ---------------------------------------------------------
    '--platform-primary': primary,
    '--platform-primary-on': onColour(primary),
    '--brand-accent': accent,
    '--brand-accent-on': onColour(accent),

    // Tints derived from the two brand colours. Everything structural in
    // print.css references these, so a tenant only ever supplies two colours.
    '--brand-accent-soft': mix(accent, paper, 0.82),
    '--brand-accent-line': mix(accent, primary, 0.25),
    '--primary-soft': mix(primary, paper, 0.94),
    '--primary-mid': mix(primary, paper, 0.55),

    // --- paper + ink ------------------------------------------------------
    '--paper': paper,
    '--ink': mix(primary, '#000000', 0.1),
    '--ink-muted': mix(primary, paper, 0.42),
    '--ink-faint': mix(primary, paper, 0.62),
    '--rule': mix(primary, paper, 0.86),
    '--rule-strong': mix(primary, paper, 0.7),

    // --- strings used in @page margin boxes and generated content --------
    '--org-name': cssString(t.orgName),
    '--doc-title': cssString(t.docTitle),
    '--footer-note': cssString(t.footerNote ?? ''),
    '--powered-by-text': cssString(t.poweredBy ? 'Powered by ImpactMEL' : ''),

    // --- geometry ---------------------------------------------------------
    '--page-size': 'A4',
  };

  const lines = Object.entries(vars).map(([k, v]) => `  ${k}: ${v};`);

  // Logo is optional: when the tenant has no mark on disk the cover falls back
  // to a typographic wordmark, so a client build never renders a broken image.
  lines.push(`  --has-logo: ${ctx.logoHref ? 1 : 0};`);
  if (ctx.logoHref) lines.push(`  --logo: url(${JSON.stringify(ctx.logoHref)});`);

  return [
    `/* theme: ${t.key}${ctx.variant ? ` | variant: ${ctx.variant}` : ''} */`,
    ':root {',
    ...lines,
    '}',
    // Toggle: show the "powered by" line only when the tenant asked for it.
    t.poweredBy ? '' : '.cover__powered { display: none; }',
  ]
    .filter(Boolean)
    .join('\n');
}

/** Values the HTML template needs as text rather than as CSS. */
export function themeText(t, variant) {
  return {
    orgName: t.orgName,
    docTitle: t.docTitle,
    docSubtitle: t.docSubtitle,
    variantLabel: VARIANT_LABELS[variant] ?? variant,
    poweredBy: t.poweredBy,
    footerNote: t.footerNote ?? '',
  };
}

export const THEME_FLAGS = [
  ['--theme <key>', `preset: ${Object.keys(PRESETS).join(' | ')}`],
  ['--org-name <text>', 'organisation name; appears in the running header and on the cover'],
  ['--doc-title <text>', 'cover title'],
  ['--doc-subtitle <text>', 'cover subtitle'],
  ['--brand-accent <hex>', 'tenant accent colour'],
  ['--platform-primary <hex>', 'tenant primary colour'],
  ['--logo <path>', 'logo file, relative to print/ (falls back to a wordmark if missing)'],
  ['--powered-by <true|false>', 'show "Powered by ImpactMEL" on the cover'],
  ['--footer-note <text>', 'small note on the cover footer'],
];
