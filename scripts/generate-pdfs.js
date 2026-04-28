#!/usr/bin/env node
/**
 * Generates one PDF per product from the built site.
 * Run after `npm run build`: node scripts/generate-pdfs.js
 */
import puppeteer from 'puppeteer';
import { createServer } from 'node:http';
import { createReadStream, existsSync, readdirSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '../dist');
const PORT = 4322;
const BASE = `http://localhost:${PORT}`;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};

// Must match sidebar section order in astro.config.mjs
const SECTION_ORDER = ['', 'overview', 'quickstart', 'how-to', 'ui', 'faq', 'changelog'];

const PRODUCTS = [
  { id: 'edge',      title: 'Invisyne Edge' },
  { id: 'companion', title: 'Invisyne Companion' },
  { id: 'hub',       title: 'Invisyne Hub' },
];

function startServer() {
  return new Promise(resolve => {
    const server = createServer((req, res) => {
      let urlPath = req.url.split('?')[0];
      if (urlPath.endsWith('/')) urlPath += 'index.html';
      let filePath = join(DIST, urlPath);
      if (!existsSync(filePath) && existsSync(filePath + '.html')) filePath += '.html';
      if (!existsSync(filePath)) { res.writeHead(404); res.end('Not found'); return; }
      res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' });
      createReadStream(filePath).pipe(res);
    });
    server.listen(PORT, () => resolve(server));
  });
}

function findPages(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findPages(full));
    else if (entry.name === 'index.html') results.push(full);
  }
  return results;
}

function sortPages(pages, productId) {
  const base = join(DIST, productId);
  return pages.sort((a, b) => {
    const rel = p => p.replace(base, '').replace(/\/?index\.html$/, '').replace(/^\//, '');
    const section = p => rel(p).split('/')[0] || '';
    const rank = p => { const i = SECTION_ORDER.indexOf(section(p)); return i === -1 ? 999 : i; };
    if (rank(a) !== rank(b)) return rank(a) - rank(b);
    return a.localeCompare(b);
  });
}

const PRINT_CSS = `
  * { box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 10.5pt;
    line-height: 1.6;
    color: #1a1a1a;
    margin: 0;
    padding: 0;
  }
  .cover {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
    page-break-after: always;
  }
  .cover h1 { font-size: 32pt; margin: 0 0 0.4em; }
  .cover p { font-size: 13pt; color: #6b7280; margin: 0; }
  .section { page-break-before: always; }
  h1 { font-size: 20pt; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.25em; margin-top: 0; }
  h2 { font-size: 15pt; }
  h3 { font-size: 12pt; }
  h4, h5, h6 { font-size: 10.5pt; }
  code {
    font-family: 'SFMono-Regular', Consolas, monospace;
    background: #f3f4f6;
    padding: 1px 5px;
    border-radius: 3px;
    font-size: 9pt;
  }
  pre {
    background: #f3f4f6;
    padding: 12px 16px;
    border-radius: 6px;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    font-size: 9pt;
    line-height: 1.5;
  }
  pre code { background: none; padding: 0; }
  img { max-width: 100%; height: auto; display: block; margin: 1em 0; }
  table { border-collapse: collapse; width: 100%; margin: 1em 0; font-size: 9.5pt; }
  th { background: #f9fafb; font-weight: 600; }
  th, td { border: 1px solid #d1d5db; padding: 6px 10px; text-align: left; vertical-align: top; }
  a { color: #2563eb; text-decoration: none; }
  blockquote {
    border-left: 4px solid #e5e7eb;
    margin: 1em 0;
    padding: 0.5em 1em;
    color: #4b5563;
    background: #f9fafb;
  }
  aside, [class*="aside"] {
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 0.75em 1em;
    margin: 1em 0;
    background: #f9fafb;
  }
  ol, ul { padding-left: 1.5em; }
  li { margin: 0.2em 0; }
`;

async function extractContent(browser, url) {
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    let html = await page.evaluate(() => {
      const el = document.querySelector('.sl-markdown-content');
      return el ? el.innerHTML : '';
    });
    // Make root-relative asset URLs absolute so they load in the combined page
    html = html.replace(/src="\/((?!\/)[^"]*)"/g, `src="${BASE}/$1"`);
    return html;
  } finally {
    await page.close();
  }
}

async function buildProductPDF(browser, product, pages) {
  const sections = [];
  for (const pagePath of pages) {
    const rel = pagePath.replace(join(DIST, product.id), '').replace('index.html', '');
    const url = `${BASE}/${product.id}${rel}`;
    console.log(`  ${url}`);
    const html = await extractContent(browser, url);
    if (html) sections.push(html);
  }

  const combined = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${product.title}</title>
  <style>${PRINT_CSS}</style>
</head>
<body>
  <div class="cover">
    <h1>${product.title}</h1>
    <p>Documentation</p>
  </div>
  ${sections.map(s => `<div class="section">${s}</div>`).join('\n')}
</body>
</html>`;

  const page = await browser.newPage();
  await page.setContent(combined, { waitUntil: 'networkidle2' });
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '2cm', right: '2cm', bottom: '2.5cm', left: '2cm' },
    displayHeaderFooter: true,
    headerTemplate: `<div style="font-size:8pt;width:100%;text-align:center;color:#9ca3af;padding-top:8px;">${product.title} — Documentation</div>`,
    footerTemplate: `<div style="font-size:8pt;width:100%;text-align:center;color:#9ca3af;padding-bottom:8px;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>`,
  });
  await page.close();
  return pdf;
}

async function main() {
  console.log('Starting file server...');
  const server = await startServer();

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  await mkdir(join(DIST, 'downloads'), { recursive: true });

  try {
    for (const product of PRODUCTS) {
      console.log(`\nGenerating ${product.title} PDF...`);
      const pages = sortPages(findPages(join(DIST, product.id)), product.id);
      console.log(`  ${pages.length} pages`);
      const pdf = await buildProductPDF(browser, product, pages);
      const outPath = join(DIST, 'downloads', `${product.id}.pdf`);
      await writeFile(outPath, pdf);
      console.log(`  → dist/downloads/${product.id}.pdf`);
    }
  } finally {
    await browser.close();
    server.close();
    console.log('\nDone.');
  }
}

main().catch(err => { console.error(err); process.exit(1); });
