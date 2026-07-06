import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slugify, computePageNumbers } from './pdf-toc.js';

test('slugify lowercases and hyphenates', () => {
  assert.equal(slugify('UI Reference'), 'ui-reference');
});

test('slugify collapses runs of non-alphanumeric characters', () => {
  assert.equal(slugify("How-To's"), 'how-to-s');
});

test('slugify trims leading and trailing hyphens', () => {
  assert.equal(slugify('  Übersicht!  '), 'bersicht');
});

test('computePageNumbers: single flat chapter after cover and TOC', () => {
  const { chapters, totalPages } = computePageNumbers({
    chapters: [{ type: 'page', title: 'Overview', href: '/companion/' }],
    pageCounts: new Map([['/companion/', 2]]),
    tocPageCount: 1,
  });
  assert.equal(chapters[0].startPage, 3); // page 1 = cover, page 2 = toc, page 3 = Overview
  assert.equal(totalPages, 4); // Overview spans pages 3-4
});

test('computePageNumbers: group chapter gets a divider page before its sub-pages', () => {
  const { chapters, totalPages } = computePageNumbers({
    chapters: [{
      type: 'group',
      title: 'UI Reference',
      pages: [
        { title: 'Device List', href: '/companion/ui/device-list/' },
        { title: 'Export', href: '/companion/ui/export/' },
      ],
    }],
    pageCounts: new Map([
      ['/companion/ui/device-list/', 1],
      ['/companion/ui/export/', 3],
    ]),
    tocPageCount: 1,
  });
  const group = chapters[0];
  assert.equal(group.startPage, 3); // the divider page itself
  assert.equal(group.pages[0].startPage, 4); // Device List starts right after the divider
  assert.equal(group.pages[1].startPage, 5); // Export starts right after Device List's 1 page
  assert.equal(totalPages, 7); // divider(3) + Device List(4) + Export(5,6,7)
});

test('computePageNumbers: flat and group chapters accumulate across the whole list', () => {
  const { chapters } = computePageNumbers({
    chapters: [
      { type: 'page', title: 'Overview', href: '/companion/' },
      {
        type: 'group',
        title: 'UI Reference',
        pages: [{ title: 'Device List', href: '/companion/ui/device-list/' }],
      },
      { type: 'page', title: 'Changelog', href: '/companion/changelog/' },
    ],
    pageCounts: new Map([
      ['/companion/', 1],
      ['/companion/ui/device-list/', 2],
      ['/companion/changelog/', 1],
    ]),
    tocPageCount: 1,
  });
  assert.equal(chapters[0].startPage, 3); // Overview: 1 page (page 3)
  assert.equal(chapters[1].startPage, 4); // UI Reference divider
  assert.equal(chapters[1].pages[0].startPage, 5); // Device List: 2 pages (5-6)
  assert.equal(chapters[2].startPage, 7); // Changelog
});

test('computePageNumbers: throws when a page has no measured count', () => {
  assert.throws(
    () => computePageNumbers({
      chapters: [{ type: 'page', title: 'Overview', href: '/companion/' }],
      pageCounts: new Map(),
      tocPageCount: 0,
    }),
    /Missing page count for \/companion\//
  );
});
