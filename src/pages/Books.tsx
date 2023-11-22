import { Link } from "react-router-dom";
import Clippings from "../types/clippings";

export const Books = ({ clippings }: { clippings: Clippings[] }) => {
  return (
    <div className="flex-grow h-full w-full bg-blue-200 p-10">
      <div className="space-y-2">
        <h2 className="text-xl">Books</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-red-200">
          {clippings.map((book) => (
            <div key={book.id} className="bg-sky-700 rounded">
              <Link to={`/clippings/${book.title}`}>
                <h3>{book.title}</h3>
              </Link>
              <p>{book.highlights.length}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
