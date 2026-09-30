# syntax=docker/dockerfile:1

# Stage 1: build
FROM node:22-bookworm-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG RELEASE_NOTES_PATH=
RUN if [ -n "$RELEASE_NOTES_PATH" ]; then \
      RELEASE_NOTES_PATH="$RELEASE_NOTES_PATH" node scripts/generate-changelogs.js; \
    else \
      mkdir -p /release-notes && RELEASE_NOTES_PATH=/release-notes node scripts/generate-changelogs.js || true; \
    fi \
 && npx astro build

# Stage 2: serve
FROM nginx:1.27-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
