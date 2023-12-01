import { Link, useParams } from "react-router-dom";
import { Checkbox } from "@material-tailwind/react";
import Clipping from "../components/Clipping";
import { useBookStore } from "../stores/useBookStore";
import { getHighlights } from "../helpers/getHighlights";

export const ClippingsView = () => {
  const { id:  bookName } = useParams();
  console.log(bookName);
  const books = useBookStore((state) => state.books);
  if (bookName === undefined) return;
  const highlights = getHighlights(books, bookName);
  if (highlights === undefined) return <NoBooksFound />;

  return (
    <div className="p-10 bg-sky-50 space-y-2">
      <div className="flex justify-between items-center px-2 bg-white rounded shadow-lg">
        <h2 className="text-xl">
          <Link to="/books" className="underline">
            Books
          </Link>
          {` > ${bookName}`}
        </h2>
        <Checkbox
          ripple={false}
          className="h-6 w-6 border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
          crossOrigin={undefined}
        />
      </div>
      <div className="rounded overflow-hidden">
        {highlights.map((highlight, position) => {
          return (
            <div key={highlight.id}>
              <Clipping
                id={bookName}
                highlight={highlight}
                position={position}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const NoBooksFound = () => {
  return (
    <div>
      <div>No books here</div>
    </div>
  );
};
