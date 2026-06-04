#!/usr/bin/env node
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 780 });

// Login page screenshot
await page.goto('https://dev.hub.invisyne.com/', { waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {});
await new Promise(r => setTimeout(r, 2000));
await page.screenshot({ path: join(__dirname, '..', 'hub-login.png'), fullPage: false });

// Device list mock screenshot
const mockPath = join(__dirname, 'hub-mock.html');
await page.goto(`file://${mockPath}`, { waitUntil: 'networkidle0' });
await page.screenshot({ path: join(__dirname, '..', 'hub-devices.png'), fullPage: false });

await browser.close();
console.log('Screenshots saved.');
