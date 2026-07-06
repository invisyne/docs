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

export function renderDividerHtml(title) {
  return `<div class="section chapter-divider" id="${slugify(title)}"><h1>${title}</h1></div>`;
}

function renderTocRow(title, startPage, className) {
  const pageLabel = startPage == null ? '–' : String(startPage);
  return `<a class="${className}" href="#${slugify(title)}"><span>${title}</span><span>${pageLabel}</span></a>`;
}

export function renderTocHtml(chapters, { heading }) {
  const rows = chapters.map(chapter => {
    const chapterRow = renderTocRow(chapter.title, chapter.startPage, 'toc-entry');
    if (chapter.type === 'group') {
      const subRows = chapter.pages
        .map(pageEntry => renderTocRow(pageEntry.title, pageEntry.startPage, 'toc-subentry'))
        .join('');
      return chapterRow + subRows;
    }
    return chapterRow;
  }).join('');
  return `<div class="section toc"><h1>${heading}</h1>${rows}</div>`;
}
