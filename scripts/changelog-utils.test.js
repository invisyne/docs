import { test } from 'node:test';
import assert from 'node:assert/strict';
import { semverCompare, processFile } from './changelog-utils.js';

test('semverCompare sorts versions newest-first', () => {
  const versions = ['1.0.0', '2.0.0', '1.5.0'];
  assert.deepEqual(versions.sort(semverCompare), ['2.0.0', '1.5.0', '1.0.0']);
});

test('semverCompare compares numerically, not lexicographically', () => {
  assert.ok(semverCompare('1.9.0', '1.10.0') > 0); // 1.10.0 is newer
});

test('semverCompare treats a missing segment as 0', () => {
  assert.equal(semverCompare('1.2', '1.2.0'), 0);
});

const EN_DATE = /\*\*Released:\*\*\s*(.+)/;
const DE_DATE = /\*\*Veröffentlicht:\*\*\s*(.+)/;

test('processFile strips the H1 title line', () => {
  const raw = '# Release Notes — Companion 1.3.0\n\nSome body text.';
  const { body } = processFile(raw, EN_DATE);
  assert.ok(!body.includes('Release Notes'));
  assert.ok(body.includes('Some body text.'));
});

test('processFile extracts the release date and removes that line', () => {
  const raw = '# Title\n\n**Released:** 2026-06-29\n\nBody.';
  const { body, releaseDate } = processFile(raw, EN_DATE);
  assert.equal(releaseDate, '2026-06-29');
  assert.ok(!body.includes('Released:'));
});

test('processFile matches the German date label with its own pattern', () => {
  const raw = '# Titel\n\n**Veröffentlicht:** 2026-06-29\n\nInhalt.';
  const { releaseDate } = processFile(raw, DE_DATE);
  assert.equal(releaseDate, '2026-06-29');
});

test('processFile returns a null releaseDate when no date line matches', () => {
  const raw = '# Title\n\nBody with no date.';
  const { releaseDate } = processFile(raw, EN_DATE);
  assert.equal(releaseDate, null);
});

test('processFile demotes headings by one level', () => {
  const raw = '# Title\n\n## Highlights\n\n### Details\n\nBody.';
  const { body } = processFile(raw, EN_DATE);
  assert.ok(body.includes('### Highlights'));
  assert.ok(body.includes('#### Details'));
});

test('processFile strips a leading horizontal rule left over from the source structure', () => {
  const raw = '# Title\n\n**Released:** 2026-06-29\n\n---\n\n## Highlights\n\nBody.';
  const { body } = processFile(raw, EN_DATE);
  assert.ok(body.startsWith('### Highlights'));
});
