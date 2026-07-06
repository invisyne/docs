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
