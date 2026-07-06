import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slugify } from './pdf-toc.js';

test('slugify lowercases and hyphenates', () => {
  assert.equal(slugify('UI Reference'), 'ui-reference');
});

test('slugify collapses runs of non-alphanumeric characters', () => {
  assert.equal(slugify("How-To's"), 'how-to-s');
});

test('slugify trims leading and trailing hyphens', () => {
  assert.equal(slugify('  Übersicht!  '), 'bersicht');
});
