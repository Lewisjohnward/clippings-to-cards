import { Link } from "react-router-dom";
import { useBookStore } from "../stores/useBookStore";
import clsx from "clsx";

const views = [
  {
    id: "all",
    text: "All",
  },
  {
    id: "selected",
    text: "Selected",
    style: "pointer-events-none text-opacity-20",
  },
];

// Change component name to Books
export const BooksView = () => {
  const books = useBookStore((state) => state.books);
  const getCount = useBookStore((state) => state.getCount);

<<<<<<< HEAD

=======
  if (books.length === 0) return <NoBooksFound />;
>>>>>>> 270a0c38ccefa94ea13c500550b7ef48f6fabc81
  return (
    <div className="flex-grow h-full w-full p-10">
      <div className="space-y-8">
        <h2 className="text-4xl">Books</h2>
        <div className="space-y-2">
          <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-8 gap-4">
            {views.map((view) => {
              const count = getCount(view.id);
              return (
                <Link
                  key={view.id}
                  to={`/books/${view.id}`}
                  className={clsx(
                    "bg-white rounded shadow-xl text-black",
                    view.id == "selected" && count == 0 && view.style,
                  )}
                >
                  <div className="4xl:flex justify-between p-4">
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
    </div>
  );
};

function NoBooksFound() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <p>No clippings found!</p>
      <p>
        Upload some{" "}
        <Link to="/kindle" className="underline">
          here
        </Link>
      </p>
    </div>
  );
}
