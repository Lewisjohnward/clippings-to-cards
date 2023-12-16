import { Link } from "react-router-dom";
import clsx from "clsx";
import { useBooks, useBookActions } from "../stores/useBookStore";
import { Books } from "../types/Books";

const views = [
  {
    id: "selected",
    text: "Selected",
    style: "pointer-events-none text-opacity-20",
  },
];

export const BooksView = () => {
  const books = useBooks();
  const { getCount } = useBookActions();

  if (books.length === 0) return <NoBooksFound />;
  return (
    <div className="flex-grow h-full w-full p-10 lg:px-60 lg:py-10 xl:px-80">
      <div className="space-y-8">
        <h2 className="text-4xl">Books</h2>
        <div className="space-y-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {views.map((view) => {
              const count = getCount(view.id);
              return (
                <Link
                  key={view.id}
                  to={`/books/${view.id}`}
                  className={clsx(
                    "bg-yellow-400 rounded shadow-xl text-black hover:text-opacity-40",
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {books.map((book) => (
              <Book book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Book = ({ book }: { book: Books }) => {
  return (
    <Link key={book.id} to={`/books/${book.title}`}>
      <div className="h-full flex flex-col justify-between p-4 space-y-2 bg-yellow-400 rounded shadow-xl text-black hover:text-opacity-40">
        <div className="space-y-1">
          <h3 className="">{book.title}</h3>
          <p className="italic text-xs">-{book.author}</p>
        </div>
        <p className="text-left">{`${book.highlights.length} clippings`}</p>
      </div>
    </Link>
  );
};

const NoBooksFound = () => {
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
};
