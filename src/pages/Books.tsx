import { Link } from "react-router-dom";
import Clippings from "../types/clippings";

export const Books = ({ clippings }: { clippings: Clippings[] }) => {
  return (
    <div className="flex-grow h-full w-full bg-blue-200 p-10">
      <div className="space-y-2">
        <h2 className="text-xl">Books</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-red-200">
          {clippings.map((book) => (
            <Link key={book.id} to={`/clippings/${book.title}`}>
              <div className="p-4 space-y-2 bg-white rounded shadow-xl">
                <div>
                  <h3>{book.title}</h3>
                  <p className="italic text-sm">-{book.author}</p>
                </div>
                <p className="text-right">{`${book.highlights.length} clippings`}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
