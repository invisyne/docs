# Invisyne Documentation

This repository contains the source for the Invisyne product documentation, published at [docs.invisyne.com](https://docs.invisyne.com).

## Products

Documentation is provided for three Invisyne products:

- **Hub** — Web-based platform for centralised device management, user administration, and software distribution
- **Edge (Crawler)** — Embedded industrial IoT system for data acquisition from field devices and protocols
- **Companion** — Windows desktop application for discovering and managing Edge (Crawler) devices on the local network

## Structure

Documentation is available in English (default) and German (`/de/`). Each product has four sections:

- **Overview** — What the product is and how it fits into the Invisyne ecosystem
- **Quickstart** — First-time setup guide
- **How-To Guides** — Task-oriented guides for specific operations
- **Changelog** — Version history and release notes

## How It Works

The site is built with [Starlight](https://starlight.astro.build/) (Astro) and deployed to GitHub Pages via GitHub Actions on every push to `main`.

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

How-to guides are auto-discovered from the `how-to/` directories and added to the sidebar automatically.

## Deployment

Pushes to `main` trigger a GitHub Actions workflow that:
1. Checks out the private `release-notes` repo via GitHub App token
2. Generates changelog pages from public release notes
3. Builds the static site with Astro
4. Generates one PDF per product (`dist/downloads/`)
5. Deploys to GitHub Pages

The GitHub App requires two secrets in this repo: `RELEASE_NOTES_APP_ID` and `RELEASE_NOTES_APP_KEY`.
