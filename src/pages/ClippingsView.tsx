import { Link, useParams } from "react-router-dom";
import Clipping from "../components/Clipping";
import { useBookStore, useHighlights } from "../stores/useBookStore";
import { BiSortAlt2, FaDownload, MdDelete } from "../misc/icons";
import { Highlights } from "../types/Books";
import { Checkbox, IconButton } from "@material-tailwind/react";
import { format } from "date-fns";

const allSelected = (highlights: Highlights[]) => {
  return highlights.every((highlight) => highlight.selected === true);
};

export const ClippingsView = () => {
  /* Get id/bookname from params*/
  const { id: bookName } = useParams<keyof { id: string }>() as { id: string };
  const highlights = useHighlights(bookName);

  if (highlights.length === 0) return <NoClippingsFound />;

  return (
    <div className="flex-grow h-full w-full 2xl:px-80">
      <div className="flex justify-between px-4 md:px-4 py-4 bg-white">
        <h2 className="text-xl">
          <Link to="/books" className="underline">
            Books
          </Link>
          {` > ${bookName}`}
        </h2>
        {bookName === "selected" && <Download highlights={highlights} />}
      </div>
      <ClippingTable bookName={bookName} highlights={highlights} />
    </div>
  );
};

const DATE = "date";
const PAGE = "page";

const ClippingTable = ({
  bookName,
  highlights,
}: {
  bookName: string;
  highlights: Highlights[];
}) => {
  const toggleSelectAll = useBookStore(
    (state) => state.actions.toggleSelectAll,
  );
  const handleToggleSelectAll = () => {
    toggleSelectAll(bookName);
  };

  const sort = useBookStore((state) => state.actions.sort);
  return (
    <table className="bg-white w-full">
      <thead>
        <tr>
          <th>#</th>
          <th className="px-2 hover:underline">
            <button
              onClick={() => sort(bookName, DATE)}
              className="w-full flex justify-center items-center"
            >
              Date
              <BiSortAlt2 />
            </button>
          </th>
          <th className="px-2 hover:underline">
            <button
              onClick={() => sort(bookName, PAGE)}
              className="w-full flex justify-center items-center"
            >
              Page
              <BiSortAlt2 />
            </button>
          </th>
          <th>Text</th>
          <th>
            {bookName != "selected" && bookName != "all" && (
              <Checkbox
                checked={allSelected(highlights)}
                ripple={false}
                onChange={handleToggleSelectAll}
                className="h-6 w-6 border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                crossOrigin={undefined}
              />
            )}
          </th>
          <th className="pr-4">
            {bookName != "selected" && bookName != "all" && (
              <IconButton size="sm" variant="outlined">
                <MdDelete size={20} onClick={() => console.log("hello")} />
              </IconButton>
            )}
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
  );
};

const NoClippingsFound = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <p>No clippings here</p>
      <Link to="/books" className="underline">
        Return home
      </Link>
    </div>
  );
};

const Download = ({ highlights }: { highlights: Highlights[] }) => {
  const handleDownload = () => {
    // text content
    const texts = highlights.map((highlight) => {
      const translations = highlight.translations.join("<br>");

      //Need to escape quotes with double quotes
      return `"${highlight.text}<br><br><p style=""font-size:16px;font-style:italic"">${translations}</p>"\n`;
    });

    // file object
    const file = new Blob(texts, { type: "text/plain" });

    const now = Date.now();
    const dateddMMyy = format(now, "H-mm-ss_dd-MM-yy");
    // anchor link
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = `clippings_${dateddMMyy}.txt"`;

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
