#!/usr/bin/env node
// Downloads all Archbee-hosted images from the docs-imported Markdown files
// and saves them to src/assets/images/.
//
// Usage: node scripts/download-images.js [path-to-docs-imported]
// Defaults to ../docs-imported relative to this repo.

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join, resolve, extname } from 'path';
import { fileURLToPath } from 'url';

const DOCS_ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const IMPORT_ROOT = process.argv[2]
  ? resolve(process.cwd(), process.argv[2])
  : resolve(DOCS_ROOT, '..', 'docs-imported');
const OUT_DIR = join(DOCS_ROOT, 'src', 'assets', 'images');

mkdirSync(OUT_DIR, { recursive: true });

// Find all markdown files recursively
function findMarkdownFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findMarkdownFiles(full));
    else if (entry.name.endsWith('.md')) results.push(full);
  }
  return results;
}

// Extract clean image URLs from markdown content
function extractImageUrls(content) {
  const urlPattern = /https:\/\/(?:api|app)\.archbee\.com\/api\/optimize\/[^\s"')]+\.(?:png|PNG|jpg|JPG|jpeg|JPEG|gif|GIF|jfif|JFIF|webp|svg)/g;
  return [...new Set(content.match(urlPattern) ?? [])];
}

// Derive a local filename from a URL
function localFilename(url) {
  const segment = url.split('/').pop();
  // The segment is like "RANDOMID_original-name.png" — keep the full thing
  // but sanitize any characters that are problematic in filenames
  return segment.replace(/[^a-zA-Z0-9._-]/g, '_');
}

// Collect all URLs across all files
const allUrls = new Map(); // url -> local filename
for (const file of findMarkdownFiles(IMPORT_ROOT)) {
  const content = readFileSync(file, 'utf-8');
  for (const url of extractImageUrls(content)) {
    if (!allUrls.has(url)) {
      allUrls.set(url, localFilename(url));
    }
  }
}

console.log(`Found ${allUrls.size} unique images to download.\n`);

// Download each image
let downloaded = 0;
let skipped = 0;
let failed = 0;
const mapping = {}; // url -> local path (relative to docs root)

for (const [url, filename] of allUrls) {
  const outPath = join(OUT_DIR, filename);
  const relPath = `../../assets/images/${filename}`;
  mapping[url] = relPath;

  if (existsSync(outPath)) {
    console.log(`  skip  ${filename}`);
    skipped++;
    continue;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    writeFileSync(outPath, buffer);
    console.log(`  ✓     ${filename}`);
    downloaded++;
  } catch (err) {
    console.error(`  ✗     ${filename} — ${err.message}`);
    failed++;
  }
}

// Write mapping file for use during content migration
const mappingPath = join(DOCS_ROOT, 'scripts', 'image-mapping.json');
writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));

console.log(`\nDone. Downloaded: ${downloaded}, Skipped: ${skipped}, Failed: ${failed}`);
console.log(`Mapping written to scripts/image-mapping.json`);
