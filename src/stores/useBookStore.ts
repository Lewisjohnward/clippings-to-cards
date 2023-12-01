import { create } from "zustand";
import { Books, Highlights } from "../types/Books";
import { persist } from "zustand/middleware";

type Store = {
  books: Books[];
  initialiseBooks: (books: Books[]) => void;
  getCount: (selector: string) => number;
  getHighlights: (id: string | undefined) => Highlights[] | undefined;
};

export const useBookStore = create<Store>()(
  persist(
    (set, get) => ({
      books: [],

      initialiseBooks: (books) => {
        console.log("initialised books", books);
        return set(() => {
          return { books };
        });
      },
      getCount: (selector) => {
        const booksArr = get().books;
        if (selector === "all") {
          return booksArr
            .map((clipping) => clipping.highlights.length)
            .reduce((sum, val) => sum + val, 0);
        } else {
          return 0;
        }
      },
      getHighlights: (id) => {
        const booksArr = get().books;
        if (id === "all") {
          const highlights: Highlights[] = [];
          booksArr.forEach((book) => highlights.push(...book.highlights));
          return highlights;
        } else if (id === "selected") {
          const highlights: Highlights[] = [];
          booksArr.forEach((book) => highlights.push(...book.highlights));
          const highlightsSelected = highlights.filter(
            (highlight) => highlight.selected == true,
          );
          return highlightsSelected;
        } else {
          const booksFiltered = booksArr.filter((d) => d.title == id);
          if (booksFiltered.length === 0) return;

          const [{ highlights }] = booksArr.filter((d) => d.title == id);
          return highlights;
        }
      },
    }),
    {
      name: "book-storage",
    },
  ),
);
