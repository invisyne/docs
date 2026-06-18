#!/usr/bin/env node
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public', 'images', 'hub');

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 780 });

// 1. Login page
await page.goto('https://dev.hub.invisyne.com/', { waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {});
await new Promise(r => setTimeout(r, 2000));
await page.screenshot({ path: join(OUT, 'hub-login.png') });

// 2. Devices mock
const mockPath = join(__dirname, 'hub-mock.html');
await page.goto(`file://${mockPath}`, { waitUntil: 'networkidle0' });
await page.screenshot({ path: join(OUT, 'hub-devices.png') });

// 3. Software mock
await page.setContent(`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
* { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, sans-serif; }
body { background: #fff; }
.topbar { background: #1a1a2e; height: 48px; display: flex; align-items: center; padding: 0 24px; gap: 32px; }
.topbar-logo { color: #fff; font-size: 15px; font-weight: 600; }
.nav { color: rgba(255,255,255,0.5); font-size: 13px; padding: 4px 12px; border-radius: 6px; }
.nav.active { background: rgba(255,255,255,0.15); color: #fff; }
.content { padding: 40px 48px; }
h1 { font-size: 26px; font-weight: 700; margin-bottom: 32px; }
.section { margin-bottom: 40px; }
.section-title { font-size: 18px; font-weight: 700; margin-bottom: 16px; color: #1a1a1a; }
.version-card { border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px 24px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: flex-start; }
.ver { font-size: 16px; font-weight: 600; color: #1a1a1a; }
.date { font-size: 13px; color: #6b7280; margin-top: 4px; }
.features { font-size: 13px; color: #6b7280; margin-top: 8px; max-width: 600px; }
.btn { background: #2549ff; color: #fff; border: none; border-radius: 6px; padding: 8px 16px; font-size: 13px; cursor: pointer; }
.tag { background: #dbeafe; color: #1d4ed8; font-size: 11px; padding: 2px 8px; border-radius: 4px; font-weight: 500; }
</style></head><body>
<div class="topbar"><div class="topbar-logo">hub</div><span class="nav">Geräte</span><span class="nav active">Software</span><span class="nav">Benutzer</span></div>
<div class="content">
<h1>Software</h1>
<div class="section">
  <div class="section-title">Crawler <span class="tag">Firmware</span></div>
  <div class="version-card"><div><div class="ver">Version 2.22</div><div class="date">16.04.2026</div><div class="features">Run Export, Run Configuration, Gateway Insights</div></div><button class="btn">Download</button></div>
  <div class="version-card"><div><div class="ver">Version 2.21</div><div class="date">03.03.2026</div><div class="features">OPC UA Connector, Variable Explorer</div></div><button class="btn">Download</button></div>
</div>
<div class="section">
  <div class="section-title">Companion <span class="tag">App</span></div>
  <div class="version-card"><div><div class="ver">Version 1.1</div><div class="date">16.04.2026</div><div class="features">Run Data Export als CSV</div></div><button class="btn">Download</button></div>
</div>
</div></body></html>`);
await page.screenshot({ path: join(OUT, 'hub-software.png') });

// 4. Account settings mock
await page.setContent(`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
* { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, sans-serif; }
body { background: #f5f5f5; }
.topbar { background: #1a1a2e; height: 48px; display: flex; align-items: center; padding: 0 24px; }
.topbar-logo { color: #fff; font-size: 15px; font-weight: 600; }
.content { padding: 40px; max-width: 600px; margin: 0 auto; }
h1 { font-size: 24px; font-weight: 700; margin-bottom: 32px; }
.card { background: #fff; border-radius: 12px; padding: 28px; margin-bottom: 20px; border: 1px solid #e5e7eb; }
.card-title { font-size: 16px; font-weight: 600; margin-bottom: 20px; }
.field { margin-bottom: 16px; }
label { font-size: 12px; color: #6b7280; display: block; margin-bottom: 4px; font-weight: 500; }
input { width: 100%; border: 1px solid #d1d5db; border-radius: 6px; padding: 8px 12px; font-size: 14px; color: #1a1a1a; background: #f9fafb; }
.btn { background: #2549ff; color: #fff; border: none; border-radius: 6px; padding: 8px 16px; font-size: 13px; cursor: pointer; margin-top: 8px; }
.btn-outline { background: #fff; color: #374151; border: 1px solid #d1d5db; border-radius: 6px; padding: 8px 16px; font-size: 13px; cursor: pointer; margin-top: 8px; }
</style></head><body>
<div class="topbar"><div class="topbar-logo">hub</div></div>
<div class="content">
<h1>Kontoeinstellungen</h1>
<div class="card">
  <div class="card-title">Persönliche Daten</div>
  <div class="field"><label>E-Mail-Adresse</label><input value="demo@invisyne.com" readonly></div>
  <div class="field"><label>Vorname</label><input value="Demo" readonly></div>
  <div class="field"><label>Nachname</label><input value="User" readonly></div>
  <button class="btn">Persönliche Daten bearbeiten</button>
</div>
<div class="card">
  <div class="card-title">Sicherheit</div>
  <div class="field"><label>Passwort</label><input type="password" value="password" readonly></div>
  <button class="btn-outline">Passwort bearbeiten</button>
</div>
</div></body></html>`);
await page.screenshot({ path: join(OUT, 'hub-account-settings.png') });

await browser.close();
console.log('All screenshots saved.');
