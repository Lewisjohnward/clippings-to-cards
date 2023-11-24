import { Link, useParams } from "react-router-dom";
import Clippings from "../types/clippings";

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
      {book.highlights.map((d, i) => {
        const number = i + 1;
        return (
          <div className="flex items-center gap-4">
            <p>{number}</p>
            <p>{d.text}</p>
          </div>
        );
      })}
    </div>
  );
};
