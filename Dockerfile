# syntax=docker/dockerfile:1

# Stage 1: build
FROM node:22-bookworm-slim AS builder

# Puppeteer needs Chrome dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    fonts-liberation \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnss3 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxkbcommon0 \
    libxrandr2 \
    xdg-utils \
 && rm -rf /var/lib/apt/lists/*

# Tell Puppeteer to use the system Chromium instead of downloading its own
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

COPY package*.json .npmrc ./

# Mount the GitHub token as a secret so it never appears in image layers or logs
RUN --mount=type=secret,id=GITHUB_TOKEN \
    echo "//npm.pkg.github.com/:_authToken=$(cat /run/secrets/GITHUB_TOKEN)" >> .npmrc \
 && npm ci \
 && rm -f .npmrc

COPY . .

ARG RELEASE_NOTES_PATH=
# If a release-notes path is provided, use it; otherwise skip changelog generation
RUN if [ -n "$RELEASE_NOTES_PATH" ]; then \
      RELEASE_NOTES_PATH="$RELEASE_NOTES_PATH" node scripts/generate-changelogs.js; \
    else \
      mkdir -p /release-notes && RELEASE_NOTES_PATH=/release-notes node scripts/generate-changelogs.js || true; \
    fi \
 && npx astro build \
 && npm run generate-pdfs

# Stage 2: serve
FROM nginx:1.27-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Simple config: serve on 8080, gzip on, SPA-friendly 404→index fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
