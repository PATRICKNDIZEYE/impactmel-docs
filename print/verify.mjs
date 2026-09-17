#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { inflateSync } from 'node:zlib';
import { basename, dirname, join } from 'node:path';

const MARKERS = [
  {
    what: 'role-fenced block (me_officer, org_admin) inside a chapter all roles receive',
    phrase: 'Reject a submission back to the reporter',
    expectIn: ['full', 'me_officer', 'org_admin'],
  },
  {
    what: 'role-fenced block (org_admin only)',
    phrase: 'Rotating the organisation code',
    expectIn: ['full', 'org_admin'],
  },
  {
    what: 'whole chapter dropped by frontmatter roles (org_admin only)',
    phrase: 'Deleting an organisation',
    expectIn: ['full', 'org_admin'],
  },
  {
    what: 'chapter all roles receive (control: must be everywhere)',
    phrase: 'How This Manual Is Built',
    expectIn: ['full', 'viewer', 'reporter', 'me_officer', 'org_admin'],
  },
];

// ------------------------------------------------------------------ utils ---

const run = (cmd, args) => execFileSync(cmd, args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

const norm = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[‘’“”]/g, "'")
    .replace(/[–—]/g, '-')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const spacedRe = (word, trailing = '') => new RegExp(word.split('').join('\\s*') + trailing);

const CHAPTER_RE = spacedRe('CHAPTER', '\\s*(\\d+)');

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const DIM = '\x1b[2m';
const YEL = '\x1b[33m';
const OFF = '\x1b[0m';

class Report {
  constructor(label) {
    this.label = label;
    this.rows = [];
  }
  pass(name, detail = '') {
    this.rows.push({ ok: true, name, detail });
  }
  fail(name, detail = '') {
    this.rows.push({ ok: false, name, detail });
  }
  note(name, detail = '') {
    this.rows.push({ ok: null, name, detail });
  }
  get failed() {
    return this.rows.filter((r) => r.ok === false);
  }
  print() {
    console.log(`\n${this.label}`);
    console.log('-'.repeat(this.label.length));
    for (const r of this.rows) {
      const mark = r.ok === null ? `${YEL}·${OFF}` : r.ok ? `${GREEN}✓${OFF}` : `${RED}✗${OFF}`;
      console.log(`  ${mark} ${r.name}${r.detail ? `\n      ${DIM}${r.detail}${OFF}` : ''}`);
    }
  }
}

// -------------------------------------------------------------- pdf access ---

function pdfPages(pdf) {
  const info = run('pdfinfo', [pdf]);
  const pages = Number((info.match(/^Pages:\s+(\d+)/m) || [])[1]);
  const size = (info.match(/^Page size:\s+(.+)$/m) || [])[1]?.trim() ?? '';
  return { pages, size, info };
}

/** Text of each page, 1-indexed (index 0 unused). */
function pdfPageText(pdf, pages) {
  const out = [null];
  for (let p = 1; p <= pages; p++) {
    out.push(run('pdftotext', ['-layout', '-f', String(p), '-l', String(p), pdf, '-']));
  }
  return out;
}

// ------------------------------------------------------------------ checks ---

function parseTOC(pageTexts, tocPages) {
  const entries = [];
  let carry = '';
  let carryIndent = 0;

  const runningHeader = new RegExp(spacedRe('CONTENTS').source + '\\s*$');
  const isFurniture = (line) => {
    if (/Page\s+\d+\s+of\s+\d+\s*$/.test(line)) return true; // footer
    if (runningHeader.test(line)) return true; // "ORG ... CONTENTS"
    if (/^\s*Contents\s*$/.test(line)) return true; // the section's own H1
    return false;
  };

  for (const p of tocPages) {
    // A wrapped entry never spans a page break in this layout, so anything
    // still buffered at a page boundary is noise.
    carry = '';
    carryIndent = 0;
    for (const rawLine of pageTexts[p].split('\n')) {
      const line = rawLine.replace(/\s+$/, '');
      if (!line.trim()) continue;
      if (isFurniture(line)) continue;

      const indent = line.length - line.trimStart().length;
      const m = line.match(/^(.*?)[\s.·]*\s(\d{1,4})$/);
      if (!m) {
        carry = carry ? `${carry} ${line.trim()}` : line.trim();
        carryIndent = carryIndent || indent;
        continue;
      }
      let text = `${carry} ${m[1]}`.trim();
      const useIndent = carry ? carryIndent : indent;
      carry = '';
      carryIndent = 0;

      text = text.replace(/[.\s·]+$/, '').trim();
      if (!text) continue;
      entries.push({
        text,
        page: Number(m[2]),
        indentLevel: useIndent > 12 ? 3 : useIndent > 4 ? 2 : 1,
        tocPage: p,
      });
    }
  }
  return entries;
}

/** Which pages are the contents pages: after the cover, before chapter 1. */
function locateSections(pageTexts, pages) {
  const firstChapter = (() => {
    for (let p = 2; p <= pages; p++) if (CHAPTER_RE.test(pageTexts[p])) return p;
    return -1;
  })();
  const tocPages = [];
  for (let p = 2; p < (firstChapter === -1 ? pages + 1 : firstChapter); p++) tocPages.push(p);
  return { tocPages, firstChapter };
}

/** Map page -> chapter number, from the "CHAPTER n" opener plus carry-forward. */
function chapterByPage(pageTexts, pages, firstChapter) {
  const map = new Array(pages + 1).fill(0);
  let current = 0;
  for (let p = 1; p <= pages; p++) {
    if (p < firstChapter || firstChapter === -1) continue;
    const m = pageTexts[p].match(CHAPTER_RE);
    if (m) current = Number(m[1]);
    map[p] = current;
  }
  return map;
}

function checkPDF(pdf, variant, rep) {
  const { pages, size } = pdfPages(pdf);
  const pageTexts = pdfPageText(pdf, pages);
  const all = pageTexts.slice(1).join('\n');

  rep.note(`page count: ${pages}`, `page size: ${size}`);
  // A4 is 595.276 x 841.89 pt. Compare numerically with a 1pt tolerance rather
  // than pattern-matching pdfinfo's formatting.
  const dims = (size.match(/([\d.]+)\s*x\s*([\d.]+)/) || []).slice(1).map(Number);
  const isA4 = dims.length === 2 && Math.abs(dims[0] - 595.276) < 1 && Math.abs(dims[1] - 841.89) < 1;
  if (isA4) rep.pass(`page geometry is A4 (${size})`);
  else rep.fail('page geometry is A4', `pdfinfo reported: ${size}`);

  // --- 2. cover has no running header or footer (@page :first) -------------
  const coverHasFurniture = /Page\s+1\s+of\s+\d+/.test(pageTexts[1]);
  if (!coverHasFurniture) rep.pass('cover page has no header or footer (@page :first)');
  else rep.fail('cover page has no header or footer', 'found a "Page 1 of N" footer on page 1');

  const { tocPages, firstChapter } = locateSections(pageTexts, pages);
  if (firstChapter === -1) {
    rep.fail('found the first chapter opener', 'no "CHAPTER n" text in any page');
    return { pages, rep };
  }
  rep.note(`contents on page(s) ${tocPages.join(', ') || '(none)'}; chapters start on page ${firstChapter}`);

  // --- 3. running header + footer on body pages ----------------------------
  const probe = pageTexts[firstChapter];
  const orgName = readOrgName(pdf);
  if (orgName && new RegExp(orgName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(probe)) {
    rep.pass(`running header carries the organisation name ("${orgName}")`);
  } else {
    rep.fail('running header carries the organisation name', `not found on page ${firstChapter}`);
  }

  const footerRe = new RegExp(`Page\\s+${firstChapter}\\s+of\\s+${pages}`);
  if (footerRe.test(probe)) rep.pass(`footer reads "Page ${firstChapter} of ${pages}" (counter(page)/counter(pages))`);
  else rep.fail('footer shows "page N of M"', `expected /Page ${firstChapter} of ${pages}/ on page ${firstChapter}`);

  // Header shows the chapter title, carried by string-set across the chapter.
  const chapTitle = (pageTexts[firstChapter].match(new RegExp(CHAPTER_RE.source + '\\s*\\n+\\s*(.+)')) || [])[2]?.trim();
  const nextPage = pageTexts[firstChapter + 1] ?? '';
  if (chapTitle && norm(nextPage).includes(norm(chapTitle))) {
    rep.pass(`running header repeats the chapter title on continuation pages ("${chapTitle}")`);
  } else if (chapTitle) {
    rep.fail('running header repeats the chapter title', `"${chapTitle}" absent from page ${firstChapter + 1}`);
  }

  // --- 4. TOC page numbers vs reality --------------------------------------
  const parsed = parseTOC(pageTexts, tocPages);

  const expected = readBuildStat(pdf, 'toc');
  let toc = parsed.map((e) => ({ ...e, level: e.indentLevel }));

  if (Array.isArray(expected)) {
    if (expected.length === parsed.length) {
      toc = parsed.map((e, i) => {
        const level = expected[i].level;
        // A level-1 row is printed as "<chapter number>  <title>"; the heading
        // on the target page carries no number, so drop it for comparison.
        const text = level === 1 ? e.text.replace(/^\d{1,3}\s+/, '') : e.text;
        return { ...e, level, text, expectedText: expected[i].text };
      });

      const drift = toc.filter((e) => norm(e.text) !== norm(e.expectedText));
      if (!drift.length) rep.pass(`contents lists all ${expected.length} entries the build emitted, in order`);
      else
        rep.fail(
          'contents matches the build report entry for entry',
          drift.slice(0, 5).map((e) => `pdf "${e.text}" vs build "${e.expectedText}"`).join('\n      ')
        );
    } else {
      rep.fail(
        'contents entry count matches the build report',
        `build emitted ${expected.length}, ${parsed.length} parsed out of the PDF`
      );
    }
  } else {
    rep.note('no build report beside the PDF — TOC levels inferred from layout');
  }

  const byLevel = (n) => toc.filter((e) => e.level === n);
  let ok = 0;
  const bad = [];
  for (const e of toc) {
    const target = pageTexts[e.page];
    if (!target) {
      bad.push(`"${e.text}" -> page ${e.page} (out of range)`);
      continue;
    }
    if (norm(target).includes(norm(e.text))) ok++;
    else bad.push(`"${e.text}" -> claimed page ${e.page}, heading not on that page`);
  }
  const levelSummary = [1, 2, 3]
    .map((n) => (byLevel(n).length ? `${byLevel(n).length} level-${n}` : null))
    .filter(Boolean)
    .join(', ');

  if (toc.length === 0) rep.fail('table of contents parsed', 'no entries found on the contents pages');
  else if (bad.length === 0)
    rep.pass(
      `all ${toc.length} TOC page numbers match the real pages (${levelSummary})`,
      "each entry's heading text was found on the page target-counter() printed"
    );
  else
    rep.fail(
      `TOC page numbers match the real pages (${ok}/${toc.length} matched)`,
      bad.slice(0, 8).join('\n      ')
    );

  // Chapters must be monotonically ordered through the document.
  const l1 = byLevel(1);
  const outOfOrder = l1.filter((e, i) => i > 0 && e.page < l1[i - 1].page);
  if (l1.length && !outOfOrder.length) rep.pass(`${l1.length} chapter page numbers increase monotonically`);
  else if (outOfOrder.length) rep.fail('chapter page numbers increase monotonically', outOfOrder.map((e) => e.text).join(', '));

  // --- 5. figure numbering, per chapter ------------------------------------
  const chapOf = chapterByPage(pageTexts, pages, firstChapter);
  /** @type {{label: string, ch: number, fig: number, page: number}[]} */
  const figs = [];
  for (let p = firstChapter; p <= pages; p++) {
    for (const m of pageTexts[p].matchAll(/Figure\s+(\d+)\.(\d+)/g)) {
      figs.push({ label: `${m[1]}.${m[2]}`, ch: Number(m[1]), fig: Number(m[2]), page: p });
    }
  }

  if (!figs.length) {
    rep.fail('figures are numbered', 'no "Figure N.M" labels found in the PDF');
  } else {
    const problems = [];
    const perChapter = new Map();
    for (const f of figs) {
      if (!perChapter.has(f.ch)) perChapter.set(f.ch, []);
      perChapter.get(f.ch).push(f);
      const pageChapter = chapOf[f.page];
      if (pageChapter && pageChapter !== f.ch) {
        problems.push(`Figure ${f.label} sits in chapter ${pageChapter} (page ${f.page})`);
      }
    }
    for (const [ch, list] of [...perChapter].sort((a, b) => a[0] - b[0])) {
      const nums = list.map((f) => f.fig);
      if (nums[0] !== 1) problems.push(`chapter ${ch} starts at Figure ${ch}.${nums[0]}, expected .1`);
      for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[i - 1] + 1) {
          problems.push(`chapter ${ch}: ${ch}.${nums[i - 1]} followed by ${ch}.${nums[i]}`);
          break;
        }
      }
    }
    const summary = [...perChapter]
      .sort((a, b) => a[0] - b[0])
      .map(([ch, l]) => `ch${ch}: ${ch}.1-${ch}.${l[l.length - 1].fig}`)
      .join('  ');
    if (!problems.length)
      rep.pass(`${figs.length} figures numbered per chapter, each restarting at .1`, summary);
    else rep.fail('figures numbered per chapter', problems.slice(0, 8).join('\n      '));
  }

  // --- 6. role filtering ---------------------------------------------------
  for (const m of MARKERS) {
    const present = norm(all).includes(norm(m.phrase));
    const shouldBe = m.expectIn.includes(variant);
    const verdict = present === shouldBe;
    const label = `${shouldBe ? 'present' : 'ABSENT'}: ${m.what}`;
    if (verdict) rep.pass(label, `"${m.phrase}" — ${present ? 'found' : 'not found'}, as expected for ${variant}`);
    else
      rep.fail(
        label,
        `"${m.phrase}" — ${present ? 'FOUND but should be absent' : 'MISSING but should be present'} in ${variant}`
      );
  }

  // --- extra: PDF outline (bookmarks) --------------------------------------
  if (hasOutline(pdf)) rep.pass('PDF has a bookmark outline (bookmark-level / bookmark-label)');
  else rep.fail('PDF has a bookmark outline', 'no /Outlines dictionary found');

  return { pages, toc: toc.length, figures: figs.length };
}

function hasOutline(pdf) {
  const raw = readFileSync(pdf);
  if (raw.includes('/Outlines')) return true;

  const marker = Buffer.from('stream');
  const endMarker = Buffer.from('endstream');
  let at = 0;
  while ((at = raw.indexOf(marker, at)) !== -1) {
    let start = at + marker.length;
    if (raw[start] === 0x0d) start++;
    if (raw[start] === 0x0a) start++;
    const end = raw.indexOf(endMarker, start);
    if (end === -1) break;
    try {
      if (inflateSync(raw.subarray(start, end)).includes('/Outlines')) return true;
    } catch {
      /* not a flate stream, or not independently inflatable — keep going */
    }
    at = end + endMarker.length;
  }
  return false;
}

/** Read a field from the build report next to the PDF, so checks are not hard-coded. */
function readBuildStat(pdf, field) {
  const meta = join(dirname(pdf), basename(pdf).replace(/\.pdf$/, '.build.json'));
  if (!existsSync(meta)) return null;
  try {
    return JSON.parse(readFileSync(meta, 'utf8'))[field] ?? null;
  } catch {
    return null;
  }
}

const readOrgName = (pdf) => readBuildStat(pdf, 'orgName');

// -------------------------------------------------------------------- main ---

const pdfs = process.argv.slice(2);
if (!pdfs.length) {
  console.error('usage: node verify.mjs <pdf> [<pdf> ...]');
  process.exit(2);
}

const reports = [];
const summary = [];
for (const pdf of pdfs) {
  if (!existsSync(pdf)) {
    console.error(`${RED}missing:${OFF} ${pdf}`);
    process.exit(1);
  }
  const variant = (basename(pdf).match(/manual-(.+)\.pdf$/) || [])[1] ?? 'full';
  const rep = new Report(`${basename(pdf)}  [variant: ${variant}]`);
  const s = checkPDF(pdf, variant, rep);
  rep.print();
  reports.push(rep);
  summary.push({ variant, ...s });
}

console.log('\n================ summary ================');
for (const s of summary) {
  console.log(`  ${s.variant.padEnd(12)} ${String(s.pages).padStart(4)} pages   ${String(s.toc).padStart(4)} TOC entries   ${String(s.figures).padStart(3)} figures`);
}

const failures = reports.flatMap((r) => r.failed);
console.log(
  failures.length
    ? `\n${RED}${failures.length} check(s) FAILED${OFF}\n`
    : `\n${GREEN}all checks passed${OFF}\n`
);
process.exit(failures.length ? 1 : 0);
