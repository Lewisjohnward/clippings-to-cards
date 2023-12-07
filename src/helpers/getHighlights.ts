import { Books, Highlights } from "../types/Books";

export const getHighlights = (books: Books[], id: string) => {
  if (id === "all") {
    const highlights: Highlights[] = [];
    books.forEach((book) => highlights.push(...book.highlights));
    return highlights;
  } else if (id === "selected") {
    const highlights: Highlights[] = [];
    books.forEach((book) => highlights.push(...book.highlights));
    const highlightsSelected = highlights.filter(
      (highlight) => highlight.selected == true,
    );
    return highlightsSelected;
  } else {
    const booksFiltered = books.filter((d) => d.title == id);
    if (booksFiltered.length === 0) return [];

    const [{ highlights }] = books.filter((d) => d.title == id);
    return highlights;
  }
};
