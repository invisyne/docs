export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function computePageNumbers({ chapters, pageCounts, tocPageCount }) {
  let runningPage = 1 + tocPageCount; // cover (page 1) + toc
  const annotated = chapters.map(chapter => {
    if (chapter.type === 'group') {
      const startPage = runningPage + 1; // divider page
      runningPage += 1;
      const pages = chapter.pages.map(pageEntry => {
        const count = pageCounts.get(pageEntry.href);
        if (count == null) throw new Error(`Missing page count for ${pageEntry.href}`);
        const pageStart = runningPage + 1;
        runningPage += count;
        return { ...pageEntry, startPage: pageStart };
      });
      return { ...chapter, startPage, pages };
    }
    const count = pageCounts.get(chapter.href);
    if (count == null) throw new Error(`Missing page count for ${chapter.href}`);
    const startPage = runningPage + 1;
    runningPage += count;
    return { ...chapter, startPage };
  });
  return { chapters: annotated, totalPages: runningPage };
}

export function renderDividerHtml(title, id) {
  return `<div class="section chapter-divider" id="${id}"><h1>${title}</h1></div>`;
}

function renderTocRow(title, id, startPage, className) {
  const pageLabel = startPage == null ? '–' : String(startPage);
  return `<a class="${className}" href="#${id}"><span>${title}</span><span>${pageLabel}</span></a>`;
}

export function renderTocHtml(chapters, { heading }) {
  const rows = chapters.map(chapter => {
    const chapterRow = renderTocRow(chapter.title, chapter.id, chapter.startPage, 'toc-entry');
    if (chapter.type === 'group') {
      const subRows = chapter.pages
        .map(pageEntry => renderTocRow(pageEntry.title, pageEntry.id, pageEntry.startPage, 'toc-subentry'))
        .join('');
      return chapterRow + subRows;
    }
    return chapterRow;
  }).join('');
  return `<div class="section toc"><h1>${heading}</h1>${rows}</div>`;
}

// Assigns a slugified, deduplicated `id` to every chapter and group sub-page,
// so that chapters/pages sharing a title within one product still get distinct
// anchor ids (divider, content wrapper, and TOC link all use this same id).
export function assignChapterIds(chapters) {
  const seenIds = new Set();
  const nextId = title => {
    const base = slugify(title);
    let id = base;
    let n = 2;
    while (seenIds.has(id)) {
      id = `${base}-${n}`;
      n += 1;
    }
    seenIds.add(id);
    return id;
  };
  return chapters.map(chapter => {
    if (chapter.type === 'group') {
      const id = nextId(chapter.title);
      const pages = chapter.pages.map(pageEntry => ({ ...pageEntry, id: nextId(pageEntry.title) }));
      return { ...chapter, id, pages };
    }
    return { ...chapter, id: nextId(chapter.title) };
  });
}
