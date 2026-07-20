# Invisyne Documentation

This repository contains the source for the Invisyne product documentation, published at [docs.invisyne.com](https://docs.invisyne.com).

## Products

Documentation is provided for three Invisyne products:

- **Hub** — Web-based platform for centralised device management, user administration, and software distribution
- **Edge (Crawler)** — Embedded industrial IoT system for data acquisition from field devices and protocols
- **Companion** — Windows desktop application for discovering and managing Edge (Crawler) devices on the local network

## Structure

Documentation is available in English (default) and German (`/de/`). Each product has the following sections:

- **Overview** — What the product is and how it fits into the Invisyne ecosystem
- **Quickstart** — First-time setup guide
- **UI Reference** — Description of all UI pages and their functions
- **How-To Guides** — Task-oriented guides for specific operations
- **Changelog** — Version history and release notes

## How It Works

The site is built with [Starlight](https://starlight.astro.build/) (Astro) and deployed to GitHub Pages via GitHub Actions whenever a `release-*` tag is pushed. Merging to `main` builds the site as a PR check but does **not** deploy — see [Deployment](#deployment) below.

**Changelogs are generated automatically** from the private [`invisyne/release-notes`](https://github.com/invisyne/release-notes) repository at build time. Only public release notes are included — internal notes are never pulled into this repo. Upcoming (unreleased) versions are excluded.

## Local Development

**Prerequisites:** Node.js 22+

```bash
# Install dependencies
npm install

# Generate changelogs from the local release-notes repo (expected at ../release-notes)
npm run generate

# Start the dev server
npm run dev

# Build
npm run build

# Generate PDFs (run after build, outputs to dist/downloads/)
npm run generate-pdfs

# Run unit tests
npm test
```

The dev server runs at `http://localhost:4321`.

## Adding Content

Content lives in `src/content/docs/`. English pages go at the root level; German translations go under `de/`.

```
src/content/docs/
  hub/how-to/my-guide.md        ← English
  de/hub/how-to/my-guide.md     ← German
```

Each file needs at minimum a `title` and `description` in the frontmatter:

```markdown
---
title: My Guide
description: How to do the thing.
---
```

How-to guides are auto-discovered from the `how-to/` directories and added to the sidebar automatically — except for Hub, whose how-to guides are listed explicitly in `astro.config.mjs`'s sidebar config, so a new one also needs an entry added there.

## Deployment

Merging a PR into `main` does **not** deploy anything — it only runs the build as a PR check, so broken builds are caught before merge. Production deploys are a separate, deliberate step: push a `release-*` tag.

### Releasing to production

```bash
git checkout main && git pull
git tag release-$(date +%Y-%m-%d)   # or any release-* name, e.g. release-hub-launch
git push origin release-$(date +%Y-%m-%d)
```

Or, in Claude Code: `/publish-release` (optionally `/publish-release hub-launch` for a descriptive suffix instead of today's date). Handles the clean-tree check, the `main` checkout, and the tag push for you.

Pushing the tag triggers the same build/deploy pipeline described below. This is intentional: it decouples "merged and ready" from "live on docs.invisyne.com", the same way the preview environment (`preview-*` tags) already works. If you're adding content for a specific product, coordinate the release tag with that product's release timing rather than shipping docs changes the moment they're merged.

For a preview deploy that doesn't touch production, use `preview-*` tags the same way, or `/publish-preview` in Claude Code. Unlike a release, this tags whatever branch is currently checked out, since previews are usually for content that hasn't merged to `main` yet.

### What happens on a release tag push

1. **Generate release-notes token** — A short-lived GitHub App token is created to access the private `invisyne/release-notes` repo. No stored passwords; the token expires after the run.
2. **Checkout release-notes** — The private repo is checked out into the build environment.
3. **Generate changelogs** — `scripts/generate-changelogs.js` reads all public release notes and writes one changelog page per product (EN + DE). Files marked `-internal` and version folders marked `-upcoming` are excluded — they never appear in the published docs.
4. **Build** — Astro compiles the full static site to `dist/`.
5. **Generate PDFs** — `scripts/generate-pdfs.js` produces one PDF per product and language (`dist/downloads/edge-en.pdf`, `edge-de.pdf`, `hub-en.pdf`, etc.) via Puppeteer, with chapter structure and a table of contents derived from the live sidebar. PDFs are not committed to the repo.
6. **Deploy** — The `dist/` folder is deployed to GitHub Pages under the custom domain with HTTPS.

A manual re-deploy (e.g. to pick up an infrastructure change without new content) can also be triggered via `workflow_dispatch` from the Actions tab.

### Required secrets

The GitHub App requires two secrets configured in this repo's settings:

| Secret | Description |
|--------|-------------|
| `RELEASE_NOTES_APP_ID` | The App's numeric ID |
| `RELEASE_NOTES_APP_KEY` | The App's private key (PEM format) |
