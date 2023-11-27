import { Link, useParams } from "react-router-dom";
import Clippings from "../types/clippings";
import { clsx } from "clsx";
import { MdDelete } from "../misc/icons";
import { Checkbox, IconButton } from "@material-tailwind/react";

interface Props {
  clippings: Clippings[];
}

export const ClippingsDisplay = ({ clippings }: Props) => {
  const { id } = useParams();
  const [book] = clippings.filter((d) => d.title == id);
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
        />
      </div>
      <div className="space-y-4">
        {book.highlights.map((d, i) => {
          const number = i + 1;
          return (
            <div
              key={d.id}
              className={clsx(
                "flex justify-between items-center gap-4 p-2 rounded shadow-lg",
                i % 2 == 0 ? "bg-white" : "bg-yellow-200",
              )}
            >
              <div className="flex items-center gap-4 ">
                <p>{number}</p>
                <p>{d.text}</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Checkbox
                  ripple={false}
                  className="h-6 w-6 border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                />
                <IconButton size="sm" variant="outlined">
                  <MdDelete size={20} />
                </IconButton>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
