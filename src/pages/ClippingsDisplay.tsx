import { Link, useParams } from "react-router-dom";
import Clippings from "../types/clippings";
import { clsx } from "clsx";

interface Props {
  clippings: Clippings[];
}

export const ClippingsDisplay = ({ clippings }: Props) => {
  const { id } = useParams();
  const [book] = clippings.filter((d) => d.title == id);
  return (
    <div className="p-10 bg-sky-50">
      <h2 className="text-xl">
        <Link to="/books" className="underline">
          Books
        </Link>
        {` > ${id}`}
      </h2>
      <div className="space-y-4">
        {book.highlights.map((d, i) => {
          const number = i + 1;
          return (
            <div
              key={d.id}
              className={clsx(
                "flex items-center gap-4",
                i % 2 == 0 ? "bg-white" : "bg-yellow-200",
              )}
            >
              <p>{number}</p>
              <p>{d.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
