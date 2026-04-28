#!/usr/bin/env node
// Migrates Archbee-exported Markdown to Starlight-compatible Markdown.
//
// Handles: :::hint, ::::WorkflowBlock, ::::VerticalSplit, :::Heading,
//          :::BlockQuote, :::Paragraph, :::Changelog, ::Image, CDN image URLs.
//
// Translation (DE→EN or EN→DE) is done via Anthropic API when ANTHROPIC_API_KEY
// is set. Without a key, untranslated pages are written with a notice callout.
//
// Usage:
//   node scripts/migrate-content.js               # skip translation if no key
//   node scripts/migrate-content.js --no-translate # always skip translation
//   node scripts/migrate-content.js --force        # overwrite existing files

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, resolve, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const DOCS_ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const IMPORT_ROOT = resolve(DOCS_ROOT, '..', 'docs-imported');
const CONTENT_ROOT = join(DOCS_ROOT, 'src', 'content', 'docs');
const ASSETS_DIR = join(DOCS_ROOT, 'src', 'assets', 'images');

const NO_TRANSLATE = process.argv.includes('--no-translate');
const FORCE = process.argv.includes('--force');

const rawMapping = JSON.parse(readFileSync(join(DOCS_ROOT, 'scripts', 'image-mapping.json'), 'utf-8'));
const urlToFilename = Object.fromEntries(
  Object.entries(rawMapping).map(([url, path]) => [url, path.split('/').pop()])
);

// ── Frontmatter ──────────────────────────────────────────────────────────────

function extractFrontmatter(content) {
  const m = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { title: '', body: content };
  const titleM = m[1].match(/^title:\s*(.+)$/m);
  const title = titleM ? titleM[1].trim().replace(/^["']|["']$/g, '') : '';
  return { title, body: m[2] };
}

// ── Image replacement ─────────────────────────────────────────────────────────

function resolveImage(url, outputFile) {
  const filename = urlToFilename[url];
  if (!filename) return url;
  return relative(dirname(outputFile), join(ASSETS_DIR, filename));
}

function replaceImages(body, outputFile) {
  body = body.replace(/::Image\[\]\{src="([^"]+)"[^}]*\}/g,
    (_, url) => `![](${resolveImage(url, outputFile)})`);
  body = body.replace(
    /!\[([^\]]*)\]\((https?:\/\/(?:api|app)\.archbee\.com[^)]+)\)/g,
    (_, alt, url) => `![${alt}](${resolveImage(url, outputFile)})`
  );
  return body;
}

// ── Stateful directive converter ─────────────────────────────────────────────
// Handles all Archbee block directives in a single pass.

function convertDirectives(body) {
  // Pre-convert hint types (opening tag only; closing ::: is preserved)
  const hintMap = { success: 'tip', info: 'note', warning: 'caution', danger: 'danger' };
  body = body.replace(/:::hint\{type="(\w+)"\}/g, (_, t) => `:::${hintMap[t] || 'note'}`);

  const lines = body.split('\n');
  const out = [];

  const S = {
    NORMAL: 0,
    WORKFLOW: 1,
    WORKFLOW_ITEM: 2,
    VSPLIT: 3,
    VSPLIT_ITEM: 4,
    HEADING: 5,
    BLOCKQUOTE: 6,
    PARAGRAPH: 7,
    CHANGELOG: 8,
  };

  let state = S.NORMAL;
  let workflowNum = 0;
  let itemFirstLine = true;
  let innerDepth = 0; // tracks :::X openers inside an item (for Starlight asides etc.)
  let headingDepth = 2;
  let headingLines = [];
  let blockLines = [];

  for (const line of lines) {
    const t = line.trimEnd();

    if (state === S.NORMAL) {
      if (/^:{3,4}WorkflowBlock\s*$/.test(t)) {
        state = S.WORKFLOW;
        workflowNum = 0;
      } else if (/^:{3,4}VerticalSplit(?:\{[^}]*)?\s*$/.test(t)) {
        state = S.VSPLIT;
      } else if (/^:::Heading\{/.test(t)) {
        const dm = t.match(/depth="(\d+)"/);
        headingDepth = dm ? parseInt(dm[1], 10) : 2;
        headingLines = [];
        state = S.HEADING;
      } else if (/^:::BlockQuote\{/.test(t)) {
        blockLines = [];
        state = S.BLOCKQUOTE;
      } else if (/^:::Paragraph(?:\{[^}]*)?\s*$/.test(t)) {
        state = S.PARAGRAPH;
      } else if (/^:::Changelog/.test(t)) {
        state = S.CHANGELOG;
      } else {
        out.push(line);
      }

    } else if (state === S.WORKFLOW) {
      if (/^:::WorkflowBlockItem\s*$/.test(t)) {
        workflowNum++;
        state = S.WORKFLOW_ITEM;
        itemFirstLine = true;
        innerDepth = 0;
      } else if (/^::::\s*$/.test(t)) {
        state = S.NORMAL;
        if (out.length && out[out.length - 1] !== '') out.push('');
      }
      // Non-directive lines between items: skip

    } else if (state === S.WORKFLOW_ITEM) {
      if (/^:::[a-zA-Z]/.test(t) && !/^:::WorkflowBlockItem/.test(t)) {
        // Opening a nested Starlight aside or other directive inside this item
        innerDepth++;
        out.push(t === '' ? '' : (itemFirstLine ? `${workflowNum}. ${t}` : `   ${t}`));
        itemFirstLine = false;
      } else if (/^:::\s*$/.test(t)) {
        if (innerDepth > 0) {
          // Closing a nested directive — keep it, indented
          innerDepth--;
          out.push('   :::');
        } else {
          // End of this WorkflowBlockItem
          state = S.WORKFLOW;
          if (out.length && out[out.length - 1] !== '') out.push('');
        }
      } else if (t === '') {
        out.push('');
        itemFirstLine = true; // allows new paragraph to start un-indented prefix
      } else if (itemFirstLine) {
        out.push(`${workflowNum}. ${t}`);
        itemFirstLine = false;
      } else {
        out.push(`   ${t}`);
      }

    } else if (state === S.VSPLIT) {
      if (/^:{3,4}VerticalSplitItem\s*$/.test(t)) {
        state = S.VSPLIT_ITEM;
      } else if (/^::::\s*$/.test(t)) {
        state = S.NORMAL;
        if (out.length && out[out.length - 1] !== '') out.push('');
      }

    } else if (state === S.VSPLIT_ITEM) {
      if (/^:::\s*$/.test(t)) {
        state = S.VSPLIT;
        if (out.length && out[out.length - 1] !== '') out.push('');
      } else {
        out.push(line);
      }

    } else if (state === S.HEADING) {
      if (/^:::\s*$/.test(t)) {
        const text = headingLines.join(' ').replace(/\*\*/g, '').trim();
        out.push('#'.repeat(headingDepth) + ' ' + text);
        state = S.NORMAL;
      } else {
        headingLines.push(t.trim());
      }

    } else if (state === S.BLOCKQUOTE) {
      if (/^:::\s*$/.test(t)) {
        out.push('```');
        out.push(...blockLines);
        out.push('```');
        blockLines = [];
        state = S.NORMAL;
      } else {
        blockLines.push(line);
      }

    } else if (state === S.PARAGRAPH) {
      if (/^:::\s*$/.test(t)) {
        state = S.NORMAL;
      } else {
        out.push(line);
      }

    } else if (state === S.CHANGELOG) {
      if (/^:::\s*$/.test(t)) {
        state = S.NORMAL;
      }
      // Discard changelog content
    }
  }

  return out.join('\n');
}

// ── Remaining conversions ─────────────────────────────────────────────────────

function decodeEntities(body) {
  return body
    .replace(/&#x20;/g, ' ')
    .replace(/&#xA;/g, '\n')
    .replace(/&#xA0;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function convertHRules(body) {
  return body.replace(/^\*\*\*\s*$/gm, '---');
}

function collapseBlankLines(body) {
  return body.replace(/\n{3,}/g, '\n\n').trim();
}

function firstSentence(body) {
  const cleaned = body
    .replace(/^#{1,6} .+$/gm, '')           // remove headings
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')    // remove images
    .replace(/```[\s\S]*?```/g, '')          // remove code blocks
    .replace(/:::[\s\S]*?:::/g, '')          // remove aside blocks
    .replace(/[*_`[\]]/g, '')               // remove inline formatting
    .replace(/\n+/g, ' ')
    .trim();
  const m = cleaned.match(/^(.{10,120}?[.!?])\s/);
  return m ? m[1].trim() : cleaned.substring(0, 100).trim();
}

function buildPage(title, description, body) {
  return `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\n---\n\n${body}\n`;
}

function convertBody(raw, outputFile) {
  let b = raw;
  b = convertDirectives(b);
  b = replaceImages(b, outputFile);
  b = decodeEntities(b);
  b = convertHRules(b);
  b = collapseBlankLines(b);
  return b;
}

// ── Translation ───────────────────────────────────────────────────────────────

async function translate(pageContent, fromLang, toLang) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || NO_TRANSLATE) return null;

  const names = { de: 'German', en: 'English' };
  const prompt = `Translate the following technical documentation page from ${names[fromLang]} to ${names[toLang]}.

Rules:
- Preserve all Markdown syntax, headings, code blocks, image references, and frontmatter structure exactly.
- Translate the title and description fields in the frontmatter.
- Only translate human-readable text; do not translate code, file paths, URLs, or technical identifiers.
- Return only the translated content with no preamble or explanation.

${pageContent}`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 8192,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) throw new Error(`Anthropic API ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.content[0].text;
}

// ── File manifest ─────────────────────────────────────────────────────────────
// src: path(s) relative to docs-imported/
// dest: path relative to src/content/docs/
// translateFrom: 'de'|'en' — source language, translate to the other
// mergeTitle/mergeDescription: used when merging multiple src files

const C_EN = 'Companion 1.0.2 EN';
const EDGE = 'Edge 2.20 DE';
const HUB_EN = 'Hub EN';
const HUB_DE = 'Hub DE';

const MANIFEST = [

  // ════════════════════════════════════════════════════════════════════════════
  // COMPANION — English (direct)
  // ════════════════════════════════════════════════════════════════════════════
  {
    src: `${C_EN}/Overview/What is the „Companion“_.md`,
    dest: 'companion/index.md',
  },
  {
    src: `${C_EN}/Overview/Software Overview.md`,
    dest: 'companion/overview/software-overview.md',
  },
  {
    src: `${C_EN}/Overview/Safety Notice.md`,
    dest: 'companion/overview/safety-notice.md',
  },
  {
    src: `${C_EN}/Overview/Troubleshooting.md`,
    dest: 'companion/overview/troubleshooting.md',
  },
  {
    src: [
      `${C_EN}/QuickStart Guide/Installation _ Deployments.md`,
      `${C_EN}/QuickStart Guide/Technical Specifications and System Requirements.md`,
      `${C_EN}/QuickStart Guide/Initial Setup - Step by Step.md`,
      `${C_EN}/QuickStart Guide/Device Functionality-Overview.md`,
    ],
    dest: 'companion/quickstart.md',
    mergeTitle: 'Quickstart',
    mergeDescription: 'Installation, setup, and first steps for the Crawler.Companion application.',
  },
  {
    src: `${C_EN}/How-To Guides/A_ Find a Device via Network _Discovery_.md`,
    dest: 'companion/how-to/find-device.md',
  },
  {
    src: `${C_EN}/How-To Guides/B_ Configuring Network Settings _IP-Adress_.md`,
    dest: 'companion/how-to/configure-network.md',
  },
  {
    src: `${C_EN}/How-To Guides/C_ Updating a Device.md`,
    dest: 'companion/how-to/update-device.md',
  },
  {
    src: `${C_EN}/How-To Guides/D_ Opening the WebUI.md`,
    dest: 'companion/how-to/open-webui.md',
  },
  {
    src: `${C_EN}/Crawler Companion UI/Interface Overview.md`,
    dest: 'companion/ui/interface-overview.md',
  },
  {
    src: `${C_EN}/Crawler Companion UI/Device Details.md`,
    dest: 'companion/ui/device-details.md',
  },
  {
    src: `${C_EN}/Crawler Companion UI/Data Export _CSV_.md`,
    dest: 'companion/ui/data-export.md',
  },
  {
    src: `${C_EN}/Crawler Companion UI/Firmware-Updates.md`,
    dest: 'companion/ui/firmware-updates.md',
  },
  {
    src: `${C_EN}/Crawler Companion UI/Language Settings.md`,
    dest: 'companion/ui/language-settings.md',
  },
  {
    src: `${C_EN}/Crawler Companion UI/Netzwork Settings.md`,
    dest: 'companion/ui/network-settings.md',
  },
  {
    src: `${C_EN}/Crawler Companion UI/WebUI.md`,
    dest: 'companion/ui/web-ui.md',
  },
  {
    src: `${C_EN}/Crawler Companion UI/Filter- und Suchfunktionen.md`,
    dest: 'companion/ui/filter-search.md',
  },
  {
    src: `${C_EN}/Ressources/FAQ.md`,
    dest: 'companion/faq.md',
  },

  // ════════════════════════════════════════════════════════════════════════════
  // COMPANION — German (translate EN→DE)
  // ════════════════════════════════════════════════════════════════════════════
  {
    src: `${C_EN}/Overview/What is the „Companion“_.md`,
    dest: 'de/companion/index.md',
    translateFrom: 'en',
  },
  {
    src: `${C_EN}/Overview/Software Overview.md`,
    dest: 'de/companion/overview/software-overview.md',
    translateFrom: 'en',
  },
  {
    src: `${C_EN}/Overview/Safety Notice.md`,
    dest: 'de/companion/overview/safety-notice.md',
    translateFrom: 'en',
  },
  {
    src: `${C_EN}/Overview/Troubleshooting.md`,
    dest: 'de/companion/overview/troubleshooting.md',
    translateFrom: 'en',
  },
  {
    src: [
      `${C_EN}/QuickStart Guide/Installation _ Deployments.md`,
      `${C_EN}/QuickStart Guide/Technical Specifications and System Requirements.md`,
      `${C_EN}/QuickStart Guide/Initial Setup - Step by Step.md`,
      `${C_EN}/QuickStart Guide/Device Functionality-Overview.md`,
    ],
    dest: 'de/companion/quickstart.md',
    mergeTitle: 'Schnellstart',
    mergeDescription: 'Installation, Einrichtung und erste Schritte mit der Crawler.Companion-Anwendung.',
    translateFrom: 'en',
  },
  {
    src: `${C_EN}/How-To Guides/A_ Find a Device via Network _Discovery_.md`,
    dest: 'de/companion/how-to/find-device.md',
    translateFrom: 'en',
  },
  {
    src: `${C_EN}/How-To Guides/B_ Configuring Network Settings _IP-Adress_.md`,
    dest: 'de/companion/how-to/configure-network.md',
    translateFrom: 'en',
  },
  {
    src: `${C_EN}/How-To Guides/C_ Updating a Device.md`,
    dest: 'de/companion/how-to/update-device.md',
    translateFrom: 'en',
  },
  {
    src: `${C_EN}/How-To Guides/D_ Opening the WebUI.md`,
    dest: 'de/companion/how-to/open-webui.md',
    translateFrom: 'en',
  },
  {
    src: `${C_EN}/Crawler Companion UI/Interface Overview.md`,
    dest: 'de/companion/ui/interface-overview.md',
    translateFrom: 'en',
  },
  {
    src: `${C_EN}/Crawler Companion UI/Device Details.md`,
    dest: 'de/companion/ui/device-details.md',
    translateFrom: 'en',
  },
  {
    src: `${C_EN}/Crawler Companion UI/Data Export _CSV_.md`,
    dest: 'de/companion/ui/data-export.md',
    translateFrom: 'en',
  },
  {
    src: `${C_EN}/Crawler Companion UI/Firmware-Updates.md`,
    dest: 'de/companion/ui/firmware-updates.md',
    translateFrom: 'en',
  },
  {
    src: `${C_EN}/Crawler Companion UI/Language Settings.md`,
    dest: 'de/companion/ui/language-settings.md',
    translateFrom: 'en',
  },
  {
    src: `${C_EN}/Crawler Companion UI/Netzwork Settings.md`,
    dest: 'de/companion/ui/network-settings.md',
    translateFrom: 'en',
  },
  {
    src: `${C_EN}/Crawler Companion UI/WebUI.md`,
    dest: 'de/companion/ui/web-ui.md',
    translateFrom: 'en',
  },
  {
    src: `${C_EN}/Crawler Companion UI/Filter- und Suchfunktionen.md`,
    dest: 'de/companion/ui/filter-search.md',
    translateFrom: 'en',
  },
  {
    src: `${C_EN}/Ressources/FAQ.md`,
    dest: 'de/companion/faq.md',
    translateFrom: 'en',
  },

  // ════════════════════════════════════════════════════════════════════════════
  // EDGE — German (direct)
  // ════════════════════════════════════════════════════════════════════════════
  {
    src: `${EDGE}/Overview/Crawler Edge.md`,
    dest: 'de/edge/index.md',
  },
  {
    src: `${EDGE}/Overview/Hardware Spezifikationen.md`,
    dest: 'de/edge/overview/hardware.md',
  },
  {
    src: `${EDGE}/Overview/Protokolle und Feldgeräte.md`,
    dest: 'de/edge/overview/protocols.md',
  },
  {
    src: `${EDGE}/How-To Guides/Erst-Einrichtung.md`,
    dest: 'de/edge/how-to/initial-setup.md',
  },
  {
    src: `${EDGE}/How-To Guides/Einrichten der Datenaufzeichnung.md`,
    dest: 'de/edge/how-to/data-recording.md',
  },
  {
    src: `${EDGE}/How-To Guides/Installieren von Updates.md`,
    dest: 'de/edge/how-to/install-updates.md',
  },
  {
    src: `${EDGE}/How-To Guides/Visualisieren von Messwerten.md`,
    dest: 'de/edge/how-to/visualize-data.md',
  },
  {
    src: `${EDGE}/How-To Guides/Weiterleitung an AWS _IoT_.md`,
    dest: 'de/edge/how-to/aws-iot.md',
  },
  {
    src: `${EDGE}/How-To Guides/Weiterleitung an N_P Plattform.md`,
    dest: 'de/edge/how-to/np-platform.md',
  },

  // ════════════════════════════════════════════════════════════════════════════
  // EDGE — English (translate DE→EN)
  // ════════════════════════════════════════════════════════════════════════════
  {
    src: `${EDGE}/Overview/Crawler Edge.md`,
    dest: 'edge/index.md',
    translateFrom: 'de',
  },
  {
    src: `${EDGE}/Overview/Hardware Spezifikationen.md`,
    dest: 'edge/overview/hardware.md',
    translateFrom: 'de',
  },
  {
    src: `${EDGE}/Overview/Protokolle und Feldgeräte.md`,
    dest: 'edge/overview/protocols.md',
    translateFrom: 'de',
  },
  {
    src: `${EDGE}/How-To Guides/Erst-Einrichtung.md`,
    dest: 'edge/how-to/initial-setup.md',
    translateFrom: 'de',
  },
  {
    src: `${EDGE}/How-To Guides/Einrichten der Datenaufzeichnung.md`,
    dest: 'edge/how-to/data-recording.md',
    translateFrom: 'de',
  },
  {
    src: `${EDGE}/How-To Guides/Installieren von Updates.md`,
    dest: 'edge/how-to/install-updates.md',
    translateFrom: 'de',
  },
  {
    src: `${EDGE}/How-To Guides/Visualisieren von Messwerten.md`,
    dest: 'edge/how-to/visualize-data.md',
    translateFrom: 'de',
  },
  {
    src: `${EDGE}/How-To Guides/Weiterleitung an AWS _IoT_.md`,
    dest: 'edge/how-to/aws-iot.md',
    translateFrom: 'de',
  },
  {
    src: `${EDGE}/How-To Guides/Weiterleitung an N_P Plattform.md`,
    dest: 'edge/how-to/np-platform.md',
    translateFrom: 'de',
  },

  // ════════════════════════════════════════════════════════════════════════════
  // HUB — English (direct — Hub EN has real English content)
  // ════════════════════════════════════════════════════════════════════════════
  {
    src: `${HUB_EN}/Overview/What is the _Hub__.md`,
    dest: 'hub/index.md',
  },
  {
    src: `${HUB_EN}/Overview/Software overview.md`,
    dest: 'hub/overview/software-overview.md',
  },
  {
    src: `${HUB_EN}/Overview/Safety instructions.md`,
    dest: 'hub/overview/safety-notice.md',
  },
  {
    src: `${HUB_EN}/Crawler Hub UI/Device overview.md`,
    dest: 'hub/ui/device-overview.md',
  },
  {
    src: `${HUB_EN}/Crawler Hub UI/Manage devices.md`,
    dest: 'hub/ui/manage-devices.md',
  },
  {
    src: `${HUB_EN}/Crawler Hub UI/Authentication and access.md`,
    dest: 'hub/ui/authentication.md',
  },
  {
    src: `${HUB_EN}/Crawler Hub UI/Filter and search functions.md`,
    dest: 'hub/ui/filter-search.md',
  },
  {
    src: `${HUB_EN}/Crawler Hub UI/Language selection.md`,
    dest: 'hub/ui/language-settings.md',
  },
  {
    src: `${HUB_EN}/Crawler Hub UI/System requirement.md`,
    dest: 'hub/ui/system-requirements.md',
  },
  {
    src: `${HUB_EN}/Crawler Hub UI/Settings/Account Settings.md`,
    dest: 'hub/ui/account-settings.md',
  },
  {
    src: `${HUB_EN}/Crawler Hub UI/Settings/Logout.md`,
    dest: 'hub/ui/logout.md',
  },

  // ════════════════════════════════════════════════════════════════════════════
  // HUB — German (direct — Hub DE has real German content)
  // ════════════════════════════════════════════════════════════════════════════
  {
    src: `${HUB_DE}/Überblick/Was ist das _Hub__.md`,
    dest: 'de/hub/index.md',
  },
  {
    src: `${HUB_DE}/Überblick/Softwareübersicht.md`,
    dest: 'de/hub/overview/software-overview.md',
  },
  {
    src: `${HUB_DE}/Überblick/Sicherheitshinweise.md`,
    dest: 'de/hub/overview/safety-notice.md',
  },
  {
    src: `${HUB_DE}/Crawler Hub Benutzeroberfläche/Geräte-Übersicht.md`,
    dest: 'de/hub/ui/device-overview.md',
  },
  {
    src: `${HUB_DE}/Crawler Hub Benutzeroberfläche/Geräte verwalten.md`,
    dest: 'de/hub/ui/manage-devices.md',
  },
  {
    src: `${HUB_DE}/Crawler Hub Benutzeroberfläche/Authentifizierung und Zugang.md`,
    dest: 'de/hub/ui/authentication.md',
  },
  {
    src: `${HUB_DE}/Crawler Hub Benutzeroberfläche/Filter- und Suchfunktionen.md`,
    dest: 'de/hub/ui/filter-search.md',
  },
  {
    src: `${HUB_DE}/Crawler Hub Benutzeroberfläche/Sprachauswahl.md`,
    dest: 'de/hub/ui/language-settings.md',
  },
  {
    src: `${HUB_DE}/Crawler Hub Benutzeroberfläche/Systemvoraussetzung.md`,
    dest: 'de/hub/ui/system-requirements.md',
  },
  {
    src: `${HUB_DE}/Crawler Hub Benutzeroberfläche/Einstellungen/Kontoeinstellungen.md`,
    dest: 'de/hub/ui/account-settings.md',
  },
  {
    src: `${HUB_DE}/Crawler Hub Benutzeroberfläche/Einstellungen/Logout.md`,
    dest: 'de/hub/ui/logout.md',
  },
];

// ── Processing loop ───────────────────────────────────────────────────────────

const canTranslate = !NO_TRANSLATE && !!process.env.ANTHROPIC_API_KEY;
console.log(`translate=${canTranslate ? 'yes' : 'no (set ANTHROPIC_API_KEY to enable)'}  force=${FORCE}`);
console.log();

let written = 0, skipped = 0, failed = 0;
const pendingTranslation = [];

for (const entry of MANIFEST) {
  const outPath = join(CONTENT_ROOT, entry.dest);

  if (!FORCE && existsSync(outPath)) {
    const existing = readFileSync(outPath, 'utf-8');
    if (existing.split('\n').length >= 15) {
      console.log(`  skip  ${entry.dest}`);
      skipped++;
      continue;
    }
  }

  try {
    const srcPaths = Array.isArray(entry.src) ? entry.src : [entry.src];
    const parts = [];
    let mergedTitle = entry.mergeTitle || '';
    const mergedDesc = entry.mergeDescription || '';

    for (const srcRel of srcPaths) {
      const srcPath = join(IMPORT_ROOT, srcRel);
      if (!existsSync(srcPath)) {
        console.warn(`  WARN  source missing: ${srcRel}`);
        continue;
      }
      const { title, body } = extractFrontmatter(readFileSync(srcPath, 'utf-8'));
      if (!mergedTitle) mergedTitle = title;
      const trimmed = body.trim();
      if (trimmed) parts.push({ title, body: trimmed });
    }

    if (parts.length === 0) {
      console.log(`  skip  ${entry.dest}  (source empty)`);
      skipped++;
      continue;
    }

    const combinedBody = parts.length === 1
      ? parts[0].body
      : parts.map(p => (p.title ? `## ${p.title}\n\n` : '') + p.body).join('\n\n---\n\n');

    const convertedBody = convertBody(combinedBody, outPath);
    const desc = mergedDesc || firstSentence(convertedBody);

    let finalTitle = mergedTitle;
    let finalDesc = desc;
    let finalBody = convertedBody;

    if (entry.translateFrom) {
      const toLang = entry.translateFrom === 'de' ? 'en' : 'de';
      if (canTranslate) {
        process.stdout.write(`  xlate ${entry.dest}  (${entry.translateFrom}→${toLang}) ... `);
        const draft = buildPage(finalTitle, finalDesc, finalBody);
        const translated = await translate(draft, entry.translateFrom, toLang);
        if (translated) {
          const parsed = extractFrontmatter(translated);
          const descM = translated.match(/^description:\s*(.+)$/m);
          finalTitle = parsed.title || finalTitle;
          finalBody = parsed.body.trim();
          if (descM) finalDesc = descM[1].trim().replace(/^"|"$/g, '');
          console.log('done');
        }
      } else {
        const langName = entry.translateFrom === 'de' ? 'German' : 'English';
        finalBody = `:::note\nThis page has not been translated yet. Content is shown in ${langName}.\n:::\n\n${finalBody}`;
        pendingTranslation.push(entry.dest);
      }
    }

    const output = buildPage(finalTitle, finalDesc, finalBody);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, output, 'utf-8');
    if (!entry.translateFrom || !canTranslate) console.log(`  ✓     ${entry.dest}`);
    written++;
  } catch (err) {
    console.error(`  ✗     ${entry.dest}  — ${err.message}`);
    failed++;
  }
}

console.log(`\nDone. Written: ${written}, Skipped: ${skipped}, Failed: ${failed}`);

if (pendingTranslation.length > 0) {
  console.log(`\n${pendingTranslation.length} pages need translation. Re-run with ANTHROPIC_API_KEY set:`);
  console.log('  export ANTHROPIC_API_KEY=sk-ant-...');
  console.log('  node scripts/migrate-content.js --force');
}
