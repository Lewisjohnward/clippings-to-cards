import { Link } from "react-router-dom";
import Clippings from "../types/clippings";

// Change component name to Clippings
export const Books = ({ clippings }: { clippings: Clippings[] }) => {
  return (
    <div className="flex-grow h-full w-full p-10">
      <div className="space-y-2">
        <div className="flex gap-4">
          {/* Change to site/clippings site/clippings/bookname site/clippings/all site/clippings/selected*/}
          <h2 className="text-xl">Books</h2>
          <Link to="/clippings/all" className="text-xl">
            All
          </Link>
          <Link to="/clippings/selected" className="text-xl">
            Selected
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-8 gap-4  bg-red-100">
          <Link to={`/clippings/all`}>
            <div className="h-full flex flex-col justify-between p-4 space-y-2 bg-white rounded shadow-xl">
              <div className="space-y-1">
                <h3>All</h3>
                <p className="italic text-xs">-</p>
              </div>
              <p className="text-right">500</p>
            </div>
          </Link>
          <Link to={`/clippings/all`}>
            <div className="h-full flex flex-col justify-between p-4 space-y-2 bg-white rounded shadow-xl">
              <div className="space-y-1">
                <h3>Selected</h3>
                <p className="italic text-xs">-</p>
              </div>
              <p className="text-right">0</p>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-8 gap-4">
          {clippings.map((book) => (
            <Link key={book.id} to={`/clippings/${book.title}`}>
              <div className="h-full flex flex-col justify-between p-4 space-y-2 bg-white rounded shadow-xl">
                <div className="space-y-1">
                  <h3>{book.title}</h3>
                  <p className="italic text-xs">-{book.author}</p>
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
