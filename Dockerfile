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

ARG GITHUB_TOKEN

WORKDIR /app

COPY package*.json .npmrc ./
RUN echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> .npmrc \
 && npm ci \
 && rm -f .npmrc

COPY . .

# Build site + generate PDFs
# Changelogs are skipped when no release-notes repo is provided (RELEASE_NOTES_PATH unset)
RUN mkdir -p /release-notes && RELEASE_NOTES_PATH=/release-notes node scripts/generate-changelogs.js || true \
 && npx astro build \
 && npm run generate-pdfs

# Stage 2: serve
FROM nginx:1.27-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Simple config: serve on 8080, gzip on, SPA-friendly 404→index fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
