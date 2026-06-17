#!/usr/bin/env node
/**
 * Generates one PDF per product from the built site.
 * Run after `npm run build`: node scripts/generate-pdfs.js
 */
import puppeteer from 'puppeteer';
import { createServer } from 'node:http';
import { createReadStream, existsSync, readdirSync, readFileSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '../dist');
const DESIGN_TOKENS_DIR = join(__dirname, '../node_modules/@invisyne/design-tokens');
const PORT = 4322;
const BASE = `http://localhost:${PORT}`;

function buildFontCSS() {
  const fontsDir = join(DESIGN_TOKENS_DIR, 'fonts');
  if (!existsSync(fontsDir)) return '';
  const faces = [
    { file: 'GT-America-Extended-Regular', weight: 400 },
    { file: 'GT-America-Extended-Medium', weight: 500 },
  ];
  return faces.map(({ file, weight }) => {
    const woff2Path = join(fontsDir, `${file}.woff2`);
    const woffPath = join(fontsDir, `${file}.woff`);
    if (!existsSync(woff2Path)) return '';
    const woff2b64 = readFileSync(woff2Path).toString('base64');
    const woffb64 = existsSync(woffPath) ? readFileSync(woffPath).toString('base64') : null;
    const src = woffb64
      ? `url("data:font/woff2;base64,${woff2b64}") format("woff2"), url("data:font/woff;base64,${woffb64}") format("woff")`
      : `url("data:font/woff2;base64,${woff2b64}") format("woff2")`;
    return `@font-face { font-family: 'GT America Extended'; src: ${src}; font-weight: ${weight}; font-style: normal; font-display: swap; }`;
  }).filter(Boolean).join('\n');
}

function loadLogoSVG(product, variant = 'wordmark-color-pos') {
  const path = join(DESIGN_TOKENS_DIR, 'logos', product, `${product}-${variant}.svg`);
  return existsSync(path) ? readFileSync(path, 'utf-8') : '';
}

const FONT_CSS = buildFontCSS();

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

const LANGUAGES = [
  { id: 'en', label: 'Documentation',  dir: '' },
  { id: 'de', label: 'Dokumentation',  dir: 'de' },
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

function sortPages(pages, basePath) {
  const base = basePath;
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
  h1, h2, h3, h4, h5, h6 {
    font-family: 'GT America Extended', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
  .cover {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
    page-break-after: always;
    position: relative;
  }
  .cover-logo { width: 260px; margin-bottom: 1.5em; }
  .cover-logo svg { width: 100%; height: auto; display: block; }
  .cover p { font-size: 13pt; color: #6b7280; margin: 0; font-family: 'GT America Extended', -apple-system, sans-serif; }
  .cover-brand { position: absolute; bottom: 48px; width: 120px; opacity: 0.7; }
  .cover-brand svg { width: 100%; height: auto; display: block; }
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

async function buildProductPDF(browser, product, lang, pages) {
  const basePath = join(DIST, ...(lang.dir ? [lang.dir, product.id] : [product.id]));
  const urlPrefix = lang.dir ? `${BASE}/${lang.dir}/${product.id}` : `${BASE}/${product.id}`;

  const sections = [];
  for (const pagePath of pages) {
    const rel = pagePath.replace(basePath, '').replace('index.html', '');
    const url = `${urlPrefix}${rel}`;
    console.log(`  ${url}`);
    const html = await extractContent(browser, url);
    if (html) sections.push(html);
  }

  const productLogo = loadLogoSVG(product.id);
  const invisyneLogo = loadLogoSVG('invisyne');
  const combined = `<!DOCTYPE html>
<html lang="${lang.id}">
<head>
  <meta charset="utf-8">
  <title>${product.title}</title>
  <style>${FONT_CSS}\n${PRINT_CSS}</style>
</head>
<body>
  <div class="cover">
    ${productLogo ? `<div class="cover-logo">${productLogo}</div>` : `<h1>${product.title}</h1>`}
    <p>${lang.label}</p>
    ${invisyneLogo ? `<div class="cover-brand">${invisyneLogo}</div>` : ''}
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
    headerTemplate: `<div style="font-size:8pt;width:100%;text-align:center;color:#9ca3af;padding-top:8px;">${product.title} — ${lang.label}</div>`,
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
      for (const lang of LANGUAGES) {
        const basePath = join(DIST, ...(lang.dir ? [lang.dir, product.id] : [product.id]));
        if (!existsSync(basePath)) {
          console.log(`\nSkipping ${product.title} (${lang.id}) — ${basePath} not found`);
          continue;
        }
        console.log(`\nGenerating ${product.title} (${lang.id}) PDF...`);
        const pages = sortPages(findPages(basePath), basePath);
        console.log(`  ${pages.length} pages`);
        const pdf = await buildProductPDF(browser, product, lang, pages);
        const outPath = join(DIST, 'downloads', `${product.id}-${lang.id}.pdf`);
        await writeFile(outPath, pdf);
        console.log(`  → dist/downloads/${product.id}-${lang.id}.pdf`);
      }
    }
  } finally {
    await browser.close();
    server.close();
    console.log('\nDone.');
  }
}

main().catch(err => { console.error(err); process.exit(1); });
