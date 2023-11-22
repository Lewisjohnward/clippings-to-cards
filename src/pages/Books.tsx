import { useState } from "react";
import { dummyData } from "../misc/dummyData";

export const Books = () => {
  const [books, setBooks] = useState(dummyData);

  return (
    <div className="flex-grow h-full bg-blue-200 p-10">
      <div className="bg-red-200">
        <h2 className="text-xl">Books</h2>
      </div>
    </div>
  );
};
