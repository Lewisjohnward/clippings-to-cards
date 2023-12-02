import { Link, useParams } from "react-router-dom";
import Clipping from "../components/Clipping";
import { useBookStore } from "../stores/useBookStore";
import { getHighlights } from "../helpers/getHighlights";

export const ClippingsView = () => {
  const { id: bookName } = useParams();
  const books = useBookStore((state) => state.books);
  if (bookName === undefined) return;
  const highlights = getHighlights(books, bookName);
  if (highlights === undefined) return <NoBooksFound />;

  return (
    <div className="bg-sky-50">
      <div className="flex justify-between items-center p-4 bg-white shadow-lg">
        <h2 className="text-xl">
          <Link to="/books" className="underline">
            Books
          </Link>
          {` > ${bookName}`}
        </h2>
      </div>
      <div className="rounded overflow-hidden">
        {highlights.map((highlight, position) => {
          return (
            <div key={highlight.id}>
              <Clipping
                bookName={bookName}
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
