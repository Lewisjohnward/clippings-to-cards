import { create } from "zustand";
import { Books, Highlights } from "../types/Books";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Store = {
  books: Books[];
  initialiseBooks: (books: Books[]) => void;
  toggleHighlight: (bookName: string, position: number) => void;
  getCount: (selector: string) => number;
  getHighlights: (id: string) => Highlights[] | undefined;
};

export const useBookStore = create<Store>()(
  persist(
    immer((set, get) => ({
      books: [],

      initialiseBooks: (books) =>
        set(() => {
          ({ books });
        }),

      toggleHighlight: (bookName, position) => {
        const bookPosition = get()
          .books.map((book) => book.title)
          .indexOf(bookName);
        return set((state) => {
          state.books[bookPosition].highlights[position].selected =
            !state.books[bookPosition].highlights[position].selected;
        });
      },

      getCount: (selector) => {
        const booksArr = get().books;
        if (selector === "all") {
          return booksArr
            .map((clipping) => clipping.highlights.length)
            .reduce((sum, val) => sum + val, 0);
        } else {
          return booksArr
            .map((book) => book.highlights)
            .flat()
            .reduce((total, favouriteCount) => {
              return favouriteCount.selected ? total + 1 : total + 0;
            }, 0);
        }
      },
      // getAll
      // getSelected
      // getBook
      getHighlights: (id) => {
        console.log("getHighlightsId ", id);
        const booksArr = get().books;
        if (id === "all") {
          return booksArr.map((book) => book.highlights).flat();
        } else if (id === "selected") {
          return booksArr
            .map((book) => book.highlights)
            .flat()
            .filter((highlight) => highlight.selected === true);
        } else {
          const booksFiltered = booksArr.filter((d) => d.title == id);
          if (booksFiltered.length === 0) return;

          const [{ highlights }] = booksArr.filter((d) => d.title == id);
          return highlights;
        }
      },
    })),
    {
      name: "book-storage",
    },
  ),
);
