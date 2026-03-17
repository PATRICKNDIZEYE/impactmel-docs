#!/usr/bin/env node

// Usage:
//   node scripts/screenshot-docs.js --url http://localhost:5173 --out public/user-manual/images
//
// Make sure `npm run start` is running (VitePress dev server) before running this.

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const DEFAULT_URL = 'http://localhost:5173';
const DEFAULT_OUT = 'public/user-manual/images';

const pages = [
  { path: '/user-manual/overview', file: '01-01-home-screen.png' },
  { path: '/user-manual/getting-started', file: '02-01-register.png' },
  { path: '/user-manual/dashboard', file: '03-01-dashboard-overview.png' },
  { path: '/user-manual/programs', file: '04-01-programs-list.png' },
  { path: '/user-manual/projects', file: '05-01-projects-list.png' },
  { path: '/user-manual/indicators', file: '06-01-indicator-library.png' },
  { path: '/user-manual/entering-data', file: '07-01-reporter-indicators.png' },
  { path: '/user-manual/activities', file: '08-01-activities-list.png' },
  { path: '/user-manual/data-collection-forms', file: '09-01-forms-library.png' },
  { path: '/user-manual/reports', file: '10-01-reports-list.png' },
  { path: '/user-manual/settings', file: '11-01-settings-navigation.png' },
  { path: '/user-manual/roles-permissions', file: '12-01-role-assignment.png' },
];

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { url: DEFAULT_URL, out: DEFAULT_OUT };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--url' && args[i + 1]) {
      opts.url = args[i + 1];
      i++;
    } else if (args[i] === '--out' && args[i + 1]) {
      opts.out = args[i + 1];
      i++;
    }
  }

  return opts;
}

async function run() {
  const { url, out } = parseArgs();

  if (!fs.existsSync(out)) {
    fs.mkdirSync(out, { recursive: true });
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  for (const entry of pages) {
    const fullUrl = new URL(entry.path, url).href;
    console.log(`📸 Capturing ${fullUrl} → ${entry.file}`);

    await page.goto(fullUrl, { waitUntil: 'networkidle2' });
    await page.waitForTimeout(500);

    const outPath = path.join(out, entry.file);
    await page.screenshot({ path: outPath, fullPage: true });
  }

  await browser.close();
  console.log('✅ Screenshots saved to', out);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
