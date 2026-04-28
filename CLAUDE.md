# Invisyne Docs — Claude Code Instructions

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
```

## Content Conventions

- Frontmatter: always include `title` and `description`
- No Archbee components (`:::hint`, `WorkflowBlock`, etc.) — use Starlight equivalents:
  - `:::note`, `:::tip`, `:::caution`, `:::danger` for callouts
  - `<Steps>` component from `@astrojs/starlight/components` for step-by-step sequences
- Images go in `src/assets/` and are referenced with relative paths
- Filenames use lowercase kebab-case

## Changelog Generation

`scripts/generate-changelogs.js` reads from the release-notes repo and writes:
- `src/content/docs/{product}/changelog.md` (EN)
- `src/content/docs/de/{product}/changelog.md` (DE)

It skips `-internal` files and `-upcoming` version folders. Versions are sorted newest-first by semver.

Run `node scripts/generate-changelogs.js [path]` directly to regenerate. Default path is `../release-notes`.

## Content Migration (In Progress)

Source material is in `../docs-imported/` — an Archbee export with 106 Markdown files covering Hub EN/DE, Edge 2.18–2.20 EN/DE, and Companion 1.0.2 EN/DE.

Migration tasks remaining:
1. **Download images** — All images in the exported files link to `api.archbee.com`. Download them to `src/assets/` before the Archbee subscription lapses.
2. **Convert Archbee components** — `:::hint` → Starlight asides, `WorkflowBlock` → `<Steps>`, `VerticalSplit` → simple two-column layout.
3. **Migrate content** — Use Edge 2.20 and Companion 1.0.2 as source (skip Edge 2.18). Rewrite and restructure into the current doc structure rather than importing as-is.
4. **Clean up** — Some EN folders in the export have German-named files; rename during migration.

Only migrate EN first; translate to DE in a second pass.
