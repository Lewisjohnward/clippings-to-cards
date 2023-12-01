import { Link } from "react-router-dom";
import Books from "../types/Books";

const views = [
  { id: "all", text: "All", display: "total" },
  { id: "selected", text: "Selected", display: "selected" },
];

// Change component name to Books
export const BooksView = ({ books }: { books: Books[] }) => {
  const total = books.reduce(
    (sum, clipping) => sum + clipping.highlights.length,
    0,
  ); // 17.5

  // Able to extract function
  const _better_total = books
    .map((clipping) => clipping.highlights.length)
    .reduce((sum, val) => sum + val, 0);
  console.log(_better_total);

  return (
    <div className="flex-grow h-full w-full p-10">
      <div className="space-y-2">
        <h2 className="text-xl">Books</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-8 gap-4">
          {views.map((view) => {
            const count = view.display == "total" ? total : 0;
            return (
              <Link
                id={view.id}
                to={`/books/${view.id}`}
                className="bg-white rounded shadow-xl"
              >
                <div className="flex flex-col lg:flex-row justify-between p-4">
                  <h3>{view.text}</h3>
                  <p className="text-left">{count} clippings</p>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-8 gap-4">
          {books.map((book) => (
            <Link key={book.id} to={`/books/${book.title}`}>
              <div className="h-full flex flex-col justify-between p-4 space-y-2 bg-white rounded shadow-xl">
                <div className="space-y-1">
                  <h3>{book.title}</h3>
                  <p className="italic text-xs">-{book.author}</p>
                </div>
                <p className="text-left">{`${book.highlights.length} clippings`}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
