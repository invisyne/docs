import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slugify, computePageNumbers, renderDividerHtml, renderTocHtml, assignChapterIds } from './pdf-toc.js';

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

test('renderDividerHtml produces a section with the given id and the title as an h1', () => {
  const html = renderDividerHtml('UI Reference', slugify('UI Reference'));
  assert.match(html, /class="section chapter-divider"/);
  assert.match(html, /id="ui-reference"/);
  assert.match(html, /<h1>UI Reference<\/h1>/);
});

test('renderTocHtml renders a placeholder page number when startPage is missing', () => {
  const html = renderTocHtml(
    [{ type: 'page', title: 'Overview', href: '/companion/', id: slugify('Overview') }],
    { heading: 'Table of Contents' }
  );
  assert.match(html, /<h1>Table of Contents<\/h1>/);
  assert.match(html, /href="#overview"/);
  assert.match(html, /Overview/);
  assert.match(html, />–</);
});

test('renderTocHtml renders real page numbers once present', () => {
  const html = renderTocHtml(
    [{ type: 'page', title: 'Overview', href: '/companion/', id: slugify('Overview'), startPage: 3 }],
    { heading: 'Table of Contents' }
  );
  assert.match(html, />3</);
  assert.doesNotMatch(html, />–</);
});

test('renderTocHtml indents a group chapter\'s sub-pages under its own row', () => {
  const html = renderTocHtml(
    [{
      type: 'group',
      title: 'UI Reference',
      id: slugify('UI Reference'),
      startPage: 4,
      pages: [{ title: 'Device List', href: '/companion/ui/device-list/', id: slugify('Device List'), startPage: 5 }],
    }],
    { heading: 'Table of Contents' }
  );
  assert.match(html, /class="toc-entry"[^>]*href="#ui-reference"/);
  assert.match(html, /class="toc-subentry"[^>]*href="#device-list"/);
  assert.match(html, />4</);
  assert.match(html, />5</);
});

test('assignChapterIds gives every chapter and sub-page a slugified id', () => {
  const chapters = assignChapterIds([
    { type: 'page', title: 'Overview', href: '/companion/' },
    {
      type: 'group',
      title: 'UI Reference',
      pages: [{ title: 'Device List', href: '/companion/ui/device-list/' }],
    },
  ]);
  assert.equal(chapters[0].id, 'overview');
  assert.equal(chapters[1].id, 'ui-reference');
  assert.equal(chapters[1].pages[0].id, 'device-list');
});

test('assignChapterIds deduplicates ids when two chapters/pages share a title', () => {
  const chapters = assignChapterIds([
    { type: 'page', title: 'Overview', href: '/companion/' },
    {
      type: 'group',
      title: 'UI Reference',
      pages: [{ title: 'Overview', href: '/companion/ui/overview/' }],
    },
  ]);
  assert.equal(chapters[0].id, 'overview');
  assert.equal(chapters[1].pages[0].id, 'overview-2');
  assert.notEqual(chapters[0].id, chapters[1].pages[0].id);
});
