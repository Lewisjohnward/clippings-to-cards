import { create } from "zustand";
import { Books, Highlights } from "../types/Books";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Store = {
  books: Books[];
  displayDate: boolean;
  toggleDisplayDate: () => void;
  initialiseBooks: (books: Books[]) => void;
  toggleSelected: (highlight: Highlights) => void;
  toggleSelectAll: (bookName: string, select: boolean) => void;
  deleteHighlight: (highlight: Highlights) => void;
  getCount: (selector: string) => number;
  getHighlights: (id: string) => Highlights[] | undefined;
};

export const useBookStore = create<Store>()(
  persist(
    immer((set, get) => ({
      books: [],
      displayDate: false,

      toggleDisplayDate: () => {
        set((state) => {
          state.displayDate = !state.displayDate;
        });
      },

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

      toggleSelectAll: (bookName, select) => {
        const booksArray = get().books;

        const bookPosition = booksArray
          .map((book) => book.title)
          .indexOf(bookName);

        const updatedHighlights = booksArray[bookPosition].highlights.map(
          (highlight) => ({ ...highlight, selected: select }),
        );
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
