#!/usr/bin/env node
/**
 * Generates one PDF per product from the built site.
 * Run after `npm run build`: node scripts/generate-pdfs.js
 */
import puppeteer from 'puppeteer';
import { PDFDocument } from 'pdf-lib';
import { createServer } from 'node:http';
import { createReadStream, existsSync, readdirSync, readFileSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { computePageNumbers, renderDividerHtml, renderTocHtml, assignChapterIds } from './pdf-toc.js';

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

const PRODUCTS = [
  { id: 'edge',      title: 'Invisyne Edge', headerTitle: 'Invisyne Edge (Crawler)' },
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

async function extractChapters(browser, url, prefix) {
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    return await page.evaluate((prefix) => {
      const groupDetails = Array.from(document.querySelectorAll('ul.top-level > li > details'))
        .find(details => Array.from(details.querySelectorAll('a'))
          .some(a => new URL(a.href).pathname.startsWith(prefix)));
      if (!groupDetails) return [];
      const productUl = groupDetails.querySelector(':scope > ul');
      const chapters = [];
      for (const li of productUl.children) {
        const directA = li.querySelector(':scope > a');
        if (directA) {
          if (directA.classList.contains('sidebar-pdf-link')) continue;
          const title = directA.querySelector('span')?.textContent.trim() || directA.textContent.trim();
          chapters.push({ type: 'page', title, href: new URL(directA.href).pathname });
          continue;
        }
        const details = li.querySelector(':scope > details');
        if (!details) continue;
        const summaryEl = details.querySelector(':scope > summary');
        const title = summaryEl?.querySelector('.group-label')?.textContent.trim() || summaryEl?.textContent.trim() || '';
        const subUl = details.querySelector(':scope > ul');
        const pages = Array.from(subUl.querySelectorAll(':scope > li > a'))
          .filter(a => !a.classList.contains('sidebar-pdf-link'))
          .map(a => ({
            title: a.querySelector('span')?.textContent.trim() || a.textContent.trim(),
            href: new URL(a.href).pathname,
          }));
        chapters.push({ type: 'group', title, pages });
      }
      return chapters;
    }, prefix);
  } finally {
    await page.close();
  }
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
  .cover-logo { height: 60px; margin-bottom: 1.5em; }
  .cover-logo svg { height: 100%; width: auto; display: block; }
  .cover p { font-size: 13pt; color: #6b7280; margin: 0; font-family: 'GT America Extended', -apple-system, sans-serif; }
  .cover-brand { position: absolute; bottom: 48px; width: 120px; opacity: 0.7; }
  .cover-brand svg { width: 100%; height: auto; display: block; }
  .section { page-break-before: always; }
  h1 { font-size: 20pt; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.25em; margin-top: 0; }
  h2 { font-size: 15pt; page-break-before: always; page-break-after: avoid; }
  .section > h1:first-child + h2,
  .section > h1:first-child + .sl-heading-wrapper > h2 { page-break-before: avoid; }
  h2.qs-panel-title { page-break-before: avoid; }
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
  .starlight-aside {
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 0.75em 1em;
    margin: 1em 0;
    background: #f9fafb;
  }
  .starlight-aside__title {
    display: flex;
    align-items: center;
    gap: 0.5em;
    font-weight: 600;
    margin: 0 0 0.5em 0;
  }
  .starlight-aside__icon {
    flex-shrink: 0;
  }
  .starlight-aside__content > *:last-child {
    margin-bottom: 0;
  }
  .sl-anchor-link {
    display: none;
  }
  .zoom-btn {
    display: none;
  }
  [class$="-title"]:not(.site-title):not(.page-title) {
    display: block;
    font-weight: 700;
    margin: 1em 0 0.3em;
  }
  .doc-accordion-title {
    border: none;
    background: none;
    padding: 0;
    font: inherit;
  }
  .doc-accordion-arrow {
    display: none;
  }
  .ts-table {
    border: 1px solid #d1d5db;
    border-radius: 6px;
    overflow: hidden;
    margin: 1em 0;
  }
  .ts-header, .ts-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5em;
    padding: 8px 12px;
  }
  .ts-header {
    background: #f3f4f6;
  }
  .ts-header-cell {
    font-size: 8pt;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .ts-row {
    border-top: 1px solid #e5e7eb;
  }
  .ts-cell-problem {
    font-weight: 600;
  }
  ol, ul { padding-left: 1.5em; }
  li { margin: 0.2em 0; }
  .sysreq-icon {
    width: 80px;
    height: auto;
    color: #9ca3af;
    opacity: 0.5;
  }
  .role-deco-svg {
    width: 56px;
    height: 56px;
    color: #9ca3af;
    opacity: 0.3;
    flex-shrink: 0;
  }
  .chapter-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
  }
  .chapter-divider h1 {
    font-size: 26pt;
    border-bottom: none;
    margin: 0;
  }
  .toc h1 {
    margin-bottom: 1em;
  }
  .toc-entry, .toc-subentry {
    display: flex;
    justify-content: space-between;
    gap: 1em;
    padding: 0.4em 0;
    color: inherit;
    text-decoration: none;
    border-bottom: 1px dotted #e5e7eb;
  }
  .toc-entry {
    font-weight: 700;
    font-size: 11pt;
    margin-top: 0.6em;
  }
  .toc-subentry {
    font-weight: 400;
    font-size: 10pt;
    padding-left: 1.5em;
    border-bottom: 1px dotted #f3f4f6;
  }
`;

async function extractContent(browser, url) {
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    let html = await page.evaluate(() => {
      const title = document.querySelector('h1');
      const el = document.querySelector('.sl-markdown-content');
      if (el) {
        el.querySelectorAll('.qs-stepper').forEach(stepper => {
          const tabs = Array.from(stepper.querySelectorAll('.qs-tabbar .qs-tab'));
          const panels = Array.from(stepper.querySelectorAll('.qs-panels .qs-panel'));
          tabs.forEach((tab, i) => {
            const panel = panels[i];
            if (!panel) return;
            const titleEl = tab.querySelector('[class$="-title"]');
            const heading = document.createElement('h2');
            heading.className = 'qs-panel-title';
            heading.textContent = (titleEl ? titleEl.textContent : tab.textContent).trim();
            panel.insertBefore(heading, panel.firstChild);
          });
          const tabbar = stepper.querySelector('.qs-tabbar');
          if (tabbar) tabbar.remove();
        });
      }
      const titleHtml = title ? `<h1>${title.innerHTML}</h1>` : '';
      return titleHtml + (el ? el.innerHTML : '');
    });
    // Make root-relative asset URLs absolute so they load in the combined page
    html = html.replace(/src="\/((?!\/)[^"]*)"/g, `src="${BASE}/$1"`);
    // Astro's optimized <img> markup lazy-loads by default, which never
    // triggers for images outside Puppeteer's initial viewport — force
    // every image to load immediately so it's actually there for page.pdf().
    html = html.replace(/\sloading="lazy"/g, '');
    return html;
  } finally {
    await page.close();
  }
}

async function measurePageCount(browser, innerHtml) {
  const page = await browser.newPage();
  try {
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${FONT_CSS}\n${PRINT_CSS}</style></head><body><div class="section">${innerHtml}</div></body></html>`;
    await page.setContent(html, { waitUntil: 'networkidle2' });
    const pdf = await page.pdf({
      format: 'A4',
      margin: { top: '2cm', right: '2cm', bottom: '2.5cm', left: '2cm' },
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: '<span></span>',
    });
    const doc = await PDFDocument.load(pdf);
    return doc.getPageCount();
  } finally {
    await page.close();
  }
}

async function buildProductPDF(browser, product, lang) {
  const basePath = join(DIST, ...(lang.dir ? [lang.dir, product.id] : [product.id]));
  const pathPrefix = lang.dir ? `/${lang.dir}/${product.id}` : `/${product.id}`;
  const indexUrl = `${BASE}${pathPrefix}/`;

  const rawChapters = await extractChapters(browser, indexUrl, `${pathPrefix}/`);
  if (rawChapters.length === 0) {
    throw new Error(`No sidebar chapters found for ${product.title} (${lang.id}) at ${indexUrl} — the sidebar DOM structure may have changed`);
  }
  const chapters = assignChapterIds(rawChapters);
  console.log(`  ${chapters.length} top-level chapters`);

  const knownHrefs = new Set();
  for (const chapter of chapters) {
    if (chapter.type === 'group') chapter.pages.forEach(p => knownHrefs.add(p.href));
    else knownHrefs.add(chapter.href);
  }
  for (const pagePath of findPages(basePath)) {
    const rel = pagePath.replace(basePath, '').replace(/index\.html$/, '');
    const pathname = `${pathPrefix}${rel}`;
    if (pathname.endsWith('/download/')) continue; // the "Download PDF" link's own target page; deliberately excluded above
    if (!knownHrefs.has(pathname)) {
      console.warn(`  ! ${pathname} exists in dist but isn't linked from the sidebar — omitted from PDF`);
    }
  }

  const pageContent = new Map();
  const pageCounts = new Map();
  for (const href of knownHrefs) {
    const html = await extractContent(browser, `${BASE}${href}`);
    pageContent.set(href, html);
    pageCounts.set(href, await measurePageCount(browser, html));
  }

  const heading = lang.id === 'de' ? 'Inhaltsverzeichnis' : 'Table of Contents';
  const draftToc = renderTocHtml(chapters, { heading });
  const tocPageCount = await measurePageCount(browser, draftToc);

  const { chapters: finalChapters, totalPages } = computePageNumbers({ chapters, pageCounts, tocPageCount });
  console.log(`  ${totalPages} pages`);
  const finalToc = renderTocHtml(finalChapters, { heading });

  const bodyParts = [finalToc];
  for (const chapter of finalChapters) {
    if (chapter.type === 'group') {
      bodyParts.push(renderDividerHtml(chapter.title, chapter.id));
      for (const p of chapter.pages) {
        bodyParts.push(`<div class="section" id="${p.id}">${pageContent.get(p.href)}</div>`);
      }
    } else {
      bodyParts.push(`<div class="section" id="${chapter.id}">${pageContent.get(chapter.href)}</div>`);
    }
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
  ${bodyParts.join('\n')}
</body>
</html>`;

  const page = await browser.newPage();
  await page.setContent(combined, { waitUntil: 'networkidle2' });
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '2cm', right: '2cm', bottom: '2.5cm', left: '2cm' },
    displayHeaderFooter: true,
    headerTemplate: `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:8pt;width:100%;text-align:center;color:#9ca3af;padding-top:8px;">${product.headerTitle || product.title} — ${lang.label}</div>`,
    footerTemplate: `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:8pt;width:100%;text-align:center;color:#9ca3af;padding-bottom:8px;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>`,
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
        const pdf = await buildProductPDF(browser, product, lang);
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
