import { Link, useParams } from "react-router-dom";
import Books, { Highlights } from "../types/Books";
import { clsx } from "clsx";
import { MdDelete } from "../misc/icons";
import { Checkbox, IconButton } from "@material-tailwind/react";
import Clipping from "../components/Clipping";
import { useBookStore } from "../stores/useBookStore";

export const ClippingsView = () => {
  const { id } = useParams();
  const getHighlights = useBookStore((state) => state.getHighlights);
  const highlights = getHighlights(id);

  return (
    <div className="p-10 bg-sky-50 space-y-2">
      <div className="flex justify-between items-center px-2 bg-white rounded shadow-lg">
        <h2 className="text-xl">
          <Link to="/books" className="underline">
            Books
          </Link>
          {` > ${id}`}
        </h2>
        <Checkbox
          ripple={false}
          className="h-6 w-6 border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
          crossOrigin={undefined}
        />
      </div>
      <div className="rounded overflow-hidden">
        {highlights.map((highlight, i) => {
          const count = i + 1;
          return <Clipping highlight={highlight} count={count} />;
        })}
      </div>
    </div>
  );
};
