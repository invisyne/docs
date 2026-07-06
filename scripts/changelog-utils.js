export function semverCompare(a, b) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pb[i] ?? 0) - (pa[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

export function processFile(raw, datePattern) {
  const lines = raw.split('\n');

  // Strip the H1 title line
  const bodyLines = lines[0].startsWith('# ') ? lines.slice(1) : lines;

  // Extract date and remove that line
  let releaseDate = null;
  const filtered = bodyLines.filter(line => {
    const m = line.match(datePattern);
    if (m) { releaseDate = m[1].trim(); return false; }
    return true;
  });

  // Demote headings by one level (## → ###, ### → ####, etc.)
  let body = filtered
    .join('\n')
    .replace(/^(#{2,5})([ \t])/gm, '#$1$2')
    .trim();

  // Remove a leading horizontal rule left over from the original structure
  body = body.replace(/^---\s*\n+/, '').trim();

  return { body, releaseDate };
}
