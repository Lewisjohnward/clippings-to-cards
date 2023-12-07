import { create } from "zustand";
import { Books, Highlights } from "../types/Books";
import { PersistStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import SuperJSON from "superjson";

type Store = {
  books: Books[];
  initialiseBooks: (books: Books[]) => void;
  toggleSelected: (highlight: Highlights) => void;
  toggleSelectAll: (bookName: string) => void;
  deleteHighlight: (highlight: Highlights) => void;
  getCount: (selector: string) => number;
};

const allSelected = (highlights: Highlights[]) => {
  return highlights.every((highlight) => highlight.selected === true);
};

const storage: PersistStorage<Store> = {
  getItem: (name) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    return SuperJSON.parse(str);
  },
  setItem: (name, value) => {
    localStorage.setItem(name, SuperJSON.stringify(value));
  },
  removeItem: (name) => localStorage.removeItem(name),
};

export const useBookStore = create<Store>()(
  persist(
    immer((set, get) => ({
      books: [],

      initialiseBooks: (books) => set(() => ({ books })),

      toggleSelected: (highlight) => {
        const booksArray = get().books;

        const bookPosition = booksArray
          .map((book) => book.title)
          .indexOf(highlight.title);

        const highlightPosition = booksArray[bookPosition].highlights
          .map((highlight) => highlight.id)
          .indexOf(highlight.id);

        return set((state) => {
          state.books[bookPosition].highlights[highlightPosition].selected =
            !state.books[bookPosition].highlights[highlightPosition].selected;
        });
      },

      toggleSelectAll: (bookName) => {
        const booksArray = get().books;

        const bookPosition = booksArray
          .map((book) => book.title)
          .indexOf(bookName);

        const prevHighlights = booksArray[bookPosition].highlights;
        const setSelected = allSelected(prevHighlights);

        const updatedHighlights = prevHighlights.map((highlight) => ({
          ...highlight,
          selected: setSelected ? false : true,
        }));
        return set((state) => {
          state.books[bookPosition].highlights = updatedHighlights;
        });
      },

      deleteHighlight: (highlight) => {
        const booksArray = get().books;
        const bookPosition = booksArray
          .map((book) => book.title)
          .indexOf(highlight.title);

        const updatedHighlights = booksArray[bookPosition].highlights.filter(
          (highlightElement) => highlightElement.id != highlight.id,
        );

        return set((state) => {
          state.books[bookPosition].highlights = updatedHighlights;
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
    })),
    {
      name: "book-storage",
      storage,
    },
  ),
);
