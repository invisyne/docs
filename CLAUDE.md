# Invisyne Docs — Claude Code Instructions

## ⚠ Public Repository

This repository is publicly visible. Before committing anything, ensure it contains no sensitive information:

- No internal URLs, IP addresses, or hostnames beyond example values
- No credentials, API keys, tokens, or passwords
- No internal employee names, email addresses, or contact details
- No unreleased product information, roadmap details, or internal project names
- No customer-specific data or references

When in doubt, leave it out.

This is the Invisyne product documentation site built with Starlight (Astro). It covers Hub, Edge, and Companion in English and German.

## Key Facts

- **English** content lives at `src/content/docs/` (root locale, no `/en/` prefix)
- **German** content lives at `src/content/docs/de/`
- **Changelogs** are generated at build time from `../release-notes` (local) or a checked-out path (CI) — never edit changelog files manually, they will be overwritten
- **How-to guides** are auto-discovered; adding a file to `hub/how-to/` is enough to make it appear in the sidebar

## Commands

```bash
npm run generate          # Generate changelog pages from release-notes repo
npm run dev               # Generate changelogs + start dev server
npm run build             # Build static site (changelogs must already be generated)
npm run preview           # Preview the built site
npm run generate-pdfs     # Generate one PDF per product into dist/downloads/ (run after build)
```

## Content Conventions

- Frontmatter: always include `title` and `description`
- No Archbee components (`:::hint`, `WorkflowBlock`, etc.) — use Starlight equivalents:
  - `:::note`, `:::tip`, `:::caution`, `:::danger` for callouts
  - `<Steps>` component from `@astrojs/starlight/components` for step-by-step sequences
- Images go in `src/assets/` and are referenced with relative paths
- Filenames use lowercase kebab-case
- **Product naming:** The Edge device was historically called "Crawler". In content, always write **Edge (Crawler)** — never just "Edge" or just "Crawler" when referring to the device. Sidebar labels and page titles may use "Edge" alone for brevity. Do not change `Crawler.Companion` or `Crawler.Hub` — those are proper product names.

## Changelog Generation

`scripts/generate-changelogs.js` reads from the release-notes repo and writes:
- `src/content/docs/{product}/changelog.md` (EN)
- `src/content/docs/de/{product}/changelog.md` (DE)

It skips `-internal` files and `-upcoming` version folders. Versions are sorted newest-first by semver.

Run `node scripts/generate-changelogs.js [path]` directly to regenerate. Default path is `../release-notes`.

## PDF Generation

`scripts/generate-pdfs.js` generates one PDF per product from the built site. It starts a local static file server over `dist/`, visits all pages per product in sidebar order, combines them into a single styled HTML document, and prints to PDF via Puppeteer.

PDFs are written to `dist/downloads/` and deployed alongside the site. They are not committed to the repo.

Run `npm run build && npm run generate-pdfs` to regenerate locally.
