import { Link } from "react-router-dom";
import { useBookStore } from "../stores/useBookStore";

const views = [
  { id: "all", text: "All", display: "total" },
  { id: "selected", text: "Selected", display: "selected" },
];

// Change component name to Books
export const BooksView = () => {
  const books = useBookStore((state) => state.books);
  const getCount = useBookStore((state) => state.getCount);

  return (
    <div className="flex-grow h-full w-full p-10">
      <div className="space-y-8">
        <h2 className="text-4xl">Books</h2>
        <div className="space-y-2">
          <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-8 gap-4">
            {views.map((view) => {
              return (
                <Link
                  key={view.id}
                  to={`/books/${view.id}`}
                  className="bg-white rounded shadow-xl"
                >
                  <div className="flex flex-col lg:flex-row justify-between p-4">
                    <h3>{view.text}</h3>
                    <p className="text-left">{getCount(view.id)} clippings</p>
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
    </div>
  );
};
