import { Link, useParams } from "react-router-dom";
import Clipping from "../components/Clipping";
import { useBookStore } from "../stores/useBookStore";
import { getHighlights } from "../helpers/getHighlights";
import { BiSortAlt2, FaDownload, MdDelete } from "../misc/icons";
import { Highlights } from "../types/Books";
import { Checkbox, IconButton } from "@material-tailwind/react";
import { useState } from "react";

const useHeader = (bookName: string) => {
  const toggleSelectAll = useBookStore((state) => state.toggleSelectAll);
  const [select, setSelect] = useState(false);

  const selectAll = () => {
    toggleSelectAll(bookName, select);
    setSelect((prev) => !prev);
  };

  return { selectAll };
};

const allSelected = (highlights: Highlights[]) => {
  return highlights.every((highlight) => highlight.selected === true);
};

export const ClippingsView = () => {
  const { id: bookName } = useParams();
  const { selectAll } = useHeader(bookName);
  const books = useBookStore((state) => state.books);
  if (bookName === undefined) return;
  const highlights = getHighlights(books, bookName);
  if (highlights === undefined) return <NoBooksFound />;

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 bg-white shadow-lg">
        <h2 className="text-xl">
          <Link to="/books" className="underline">
            Books
          </Link>
          {` > ${bookName}`}
        </h2>
      </div>
      <table className="bg-white">
        <thead>
          <tr>
            <th>#</th>
            <th className="px-2 hover:underline">
              <button className="w-full flex justify-center items-center">
                Date
                <BiSortAlt2 />
              </button>
            </th>
            <th className="px-2 hover:underline">
              <button className="w-full flex justify-center items-center">
                Page
                <BiSortAlt2 />
              </button>
            </th>
            <th>Text</th>
            <th>
              <Checkbox
                checked={allSelected(highlights)}
                ripple={false}
                onChange={selectAll}
                className="h-6 w-6 border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                crossOrigin={undefined}
              />
            </th>
            <th className="pr-4">
              <IconButton size="sm" variant="outlined">
                <MdDelete size={20} onClick={() => console.log("hello")} />
              </IconButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {highlights.map((highlight, i) => {
            return (
              <Clipping key={highlight.id} highlight={highlight} position={i} />
            );
          })}
        </tbody>
      </table>
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

const Selected = ({ highlights }: { highlights: Highlights[] }) => {
  const handleDownload = () => {
    console.log("hello");
    // text content
    const texts = highlights.map((highlight) => `"${highlight.text}";\n`);

    // file object
    const file = new Blob(texts, { type: "text/plain" });
    file.text().then((data) => console.log(data));

    // anchor link
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = "clippings" + Date.now() + ".txt";

    // simulate link click
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    element.remove();
  };

  return (
    <>
      <button onClick={handleDownload}>
        <FaDownload />
      </button>
    </>
  );
};
