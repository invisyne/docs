#!/usr/bin/env node
// Reads public release notes from the release-notes repo and generates
// changelog pages for each product in EN and DE.
//
// Usage: node scripts/generate-changelogs.js [path-to-release-notes-repo]
// Defaults to ../release-notes relative to this repo.

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { semverCompare, processFile } from './changelog-utils.js';

const DOCS_ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const RELEASE_NOTES_ROOT = process.argv[2]
  ? resolve(process.cwd(), process.argv[2])
  : process.env.RELEASE_NOTES_PATH
    ? resolve(process.cwd(), process.env.RELEASE_NOTES_PATH)
    : resolve(DOCS_ROOT, '..', 'release-notes');

const PRODUCTS = ['edge', 'companion', 'hub'];

const LOCALES = [
  { code: 'en', docsDir: '',   datePattern: /\*\*Released:\*\*\s*(.+)/  },
  { code: 'de', docsDir: 'de', datePattern: /\*\*Veröffentlicht:\*\*\s*(.+)/ },
];

if (!existsSync(RELEASE_NOTES_ROOT)) {
  console.error(`Error: release-notes repo not found at ${RELEASE_NOTES_ROOT}`);
  process.exit(1);
}

for (const product of PRODUCTS) {
  const productDir = join(RELEASE_NOTES_ROOT, product);
  if (!existsSync(productDir)) {
    console.warn(`⚠  Skipping ${product}: not found in release-notes repo`);
    continue;
  }

  const versions = readdirSync(productDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.includes('-upcoming'))
    .map(d => d.name)
    .sort(semverCompare);

  for (const locale of LOCALES) {
    const sections = [];

    for (const version of versions) {
      const file = join(productDir, version, `release-notes-${version}-${locale.code}.md`);
      if (!existsSync(file)) {
        console.warn(`  ⚠  Missing: ${file.replace(RELEASE_NOTES_ROOT + '/', '')}`);
        continue;
      }

      const { body, releaseDate } = processFile(readFileSync(file, 'utf-8'), locale.datePattern);
      const heading = releaseDate ? `## ${version}\n\n*${releaseDate}*` : `## ${version}`;
      sections.push(`${heading}\n\n${body}`);
    }

    if (sections.length === 0) continue;

    const label = product.charAt(0).toUpperCase() + product.slice(1);
    const isDE = locale.code === 'de';

    const page = [
      '---',
      'title: Changelog',
      `description: ${isDE ? `Versionshinweise für den Invisyne ${label}.` : `Release notes for the Invisyne ${label}.`}`,
      '---',
      '',
      sections.join('\n\n---\n\n'),
      '',
    ].join('\n');

    const outPath = locale.docsDir
      ? join(DOCS_ROOT, 'src', 'content', 'docs', locale.docsDir, product, 'changelog.md')
      : join(DOCS_ROOT, 'src', 'content', 'docs', product, 'changelog.md');

    writeFileSync(outPath, page, 'utf-8');
    console.log(`✓  ${outPath.replace(DOCS_ROOT + '/', '')}`);
  }
}

console.log('\nDone.');
