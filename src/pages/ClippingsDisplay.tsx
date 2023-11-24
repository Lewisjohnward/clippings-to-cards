import { Link, useParams } from "react-router-dom";
import Clippings from "../types/clippings";

interface Props {
  clippings: Clippings[];
}

export const ClippingsDisplay = ({ clippings }: Props) => {
  const { id } = useParams();
  return (
    <div className="p-10 bg-sky-50">
      <h2 className="text-xl">
        <Link to="/books" className="underline">
          Clippings
        </Link>
        {` > ${id}`}
      </h2>
    </div>
  );
};
