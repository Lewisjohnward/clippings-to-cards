import { Link } from "react-router-dom";
import { useBooks } from "@/stores/useBookStore";
import { Books } from "@/types/Books";

export const BooksView = () => {
  const books = useBooks();

  if (books.length === 0) return <NoBooksFound />;
  return (
    <div className="flex-grow p-5 lg:px-60 lg:py-10 xl:px-80 3xl:px-[600px]">
      <div className="space-y-8">
        <h2 className="text-4xl">Books</h2>
        <div className="space-y-4">
          <p>Your kindle books:</p>
          <ul className="flex flex-wrap gap-2">
            {books.map((book) => (
              <li key={book.id}>
                <Book book={book} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Book = ({ book }: { book: Books }) => {
  return (
    <Link key={book.id} to={`/books/${book.title}/clippings`}>
      <div className="p-1 bg-yellow-400 shadow-xl text-gray-800 hover:text-opacity-40 caret-transparent">
        {book.imageURL === "" ? (
          <div className="h-48 w-28 flex flex-col justify-center gap-2 text-center">
            <p className="text-sm">{book.title}</p>
            <p className="italic text-xs">-{book.author}</p>
          </div>
        ) : (
          <img
            src={book.imageURL}
            alt={`${book.title}  cover`}
            className="h-48 w-28 text-xs hover:opacity-60"
          />
        )}
        <p className="text-center italic">{`${book.highlights.length} clippings`}</p>
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
