import { Link } from "react-router-dom";
import Clippings from "../types/clippings";

// Change component name to Clippings
export const Books = ({ clippings }: { clippings: Clippings[] }) => {
  const total = clippings.reduce(
    (sum, clipping) => sum + clipping.highlights.length,
    0,
  ); // 17.5

  // Able to extract function
  const _better_total = clippings
    .map((clipping) => clipping.highlights.length)
    .reduce((sum, val) => sum + val, 0);
  console.log(_better_total);

  return (
    <div className="flex-grow h-full w-full p-10">
      <div className="space-y-2">
        {/* Change to site/clippings site/clippings/bookname site/clippings/all site/clippings/selected*/}
        <h2 className="text-xl">Books</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-8 gap-4">
          <Link to={`/clippings/all`}>
            <div className="h-full flex flex-col justify-between p-4 space-y-2 bg-white rounded shadow-xl">
              <div className="space-y-1">
                <h3>All</h3>
                <p className="italic text-xs">-</p>
              </div>
              <p className="text-right">{total}</p>
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
