import { useState } from "react";
import { dummyData } from "../misc/dummyData";
import { Link } from "react-router-dom";

export const Books = () => {
  const [books, setBooks] = useState(dummyData);

  return (
    <div className="flex-grow h-full w-full bg-blue-200 p-10">
      <div className="space-y-2">
        <h2 className="text-xl">Books</h2>
        <div className="grid grid-cols-4 gap-4 bg-red-200">
          {books.map((book) => (
            <div key={book.id} className="bg-sky-700 rounded">
              <Link to={`/clippings/test`}>
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
