import { Link } from "react-router-dom";
import axios from "axios";
import clsx from "clsx";
import { useBooks, useBookActions } from "../stores/useBookStore";
import { Books } from "../types/Books";
import { useEffect, useState } from "react";
import { FaSpinner } from "../misc/icons";

const views = [
  {
    id: "selected",
    text: "Selected",
    style: "pointer-events-none opacity-80",
  },
];

export const BooksView = () => {
  const books = useBooks();

  if (books.length === 0) return <NoBooksFound />;
  return (
    <div className="flex-grow h-full w-full p-10 lg:px-60 lg:py-10 xl:px-80 3xl:px-[600px]">
      <div className="space-y-8">
        <h2 className="text-4xl">Books</h2>
        <div className="space-y-4">
          <p>Your kindle books:</p>
          <div className="flex flex-wrap gap-2">
            {books.map((book) => (
              <div key={book.id}>
                <Book book={book} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Book = ({ book }: { book: Books }) => {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const getCover = async () => {
      const { data } = await axios.get(
        `https://openlibrary.org/search.json?q=${book.title
          .split(" ")
          .join("+")}`,
      );
      const id = data.docs[0].seed[0].replace(/.*\//, "");
      setSrc(`https://covers.openlibrary.org/b/olid/${id}-M.jpg`);
    };
    getCover();
  }, [book]);

  return (
    <Link key={book.id} to={`/books/${book.title}/clippings`}>
      <div className="p-1 bg-yellow-400 shadow-xl text-gray-800 hover:text-opacity-40">
        {/* <h3 className="text-sm">{book.title}</h3> */}
        {/* <p className="italic text-xs">-{book.author}</p> */}
        {src ? (
          <img src={src} className="h-48 w-28 hover:opacity-60" />
        ) : (
          <div className="h-48 w-28 flex justify-center items-center text-4xl animate-spin">
            <FaSpinner />
          </div>
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
