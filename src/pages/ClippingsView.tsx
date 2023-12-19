import { Link, NavLink, Route, Routes, useParams } from "react-router-dom";
import Clipping from "../components/Clipping";
import { useBookActions, useHighlights } from "../stores/useBookStore";
import {
  BiSortAlt2,
  FaDownload,
  MdDelete,
  MdOutlineAnalytics,
  TbCardsFilled,
} from "../misc/icons";
import { Highlights } from "../types/Books";
import { IconButton } from "@material-tailwind/react";
import { format } from "date-fns";
import { getUniqueWords, getWords } from "../helpers/parseWords";

const allSelected = (highlights: Highlights[]) => {
  return highlights.every((highlight) => highlight.selected === true);
};

export const ClippingsView = () => {
  /* Get id/bookname from params*/
  const { bookName } = useParams<keyof { bookName: string }>() as {
    bookName: string;
  };
  const highlights = useHighlights(bookName);

  if (highlights.length === 0) return <NoClippingsFound />;

  return (
    <div className="flex-grow h-full w-full px-4 2xl:px-80 3xl:px-[600px]">
      <div className="flex justify-between py-4 bg-white">
        <h2 className="text-xl">
          <Link to="/books" className="underline">
            Books
          </Link>
          {` > ${bookName}`}
        </h2>
        {bookName === "selected" && <Download highlights={highlights} />}
        <NavLink
          to={`/books/${bookName}/analysis`}
          className={({ isActive }) => {
            return isActive ? "hidden" : "block";
          }}
        >
          <MdOutlineAnalytics className="text-4xl select-none" />
        </NavLink>
        <NavLink
          to={`/books/${bookName}/clippings`}
          className={({ isActive }) => {
            return isActive ? "hidden" : "block";
          }}
        >
          <TbCardsFilled className="text-4xl select-none" />
        </NavLink>
      </div>
      <Routes>
        <Route
          path="clippings"
          element={
            <ClippingTable bookName={bookName} highlights={highlights} />
          }
        />
        <Route
          path={`analysis`}
          element={<Analysis highlights={highlights} />}
        />
      </Routes>
    </div>
  );
};

const Analysis = ({ highlights }: { highlights: Highlights[] }) => {
  // Turns highlights[] into array of words
  const words = highlights
    .map((highlight) => highlight.text)
    .map((text) => getWords(text))
    .flat();

  const uniqueWords = getUniqueWords(words);

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold">Total words</h2>
        <p>{words.length}</p>
        <h2 className="text-2xl font-bold">Unique words</h2>
        <p>{uniqueWords.length}</p>
      </div>
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
  const { toggleSelectAll, sort } = useBookActions();

  const handleToggleSelectAll = () => {
    toggleSelectAll(bookName);
  };

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
              <input
                checked={allSelected(highlights)}
                onChange={handleToggleSelectAll}
                id="checked-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded ring-none select-none"
              />
            )}
          </th>
          <th className="pr-4">
            {bookName != "selected" && bookName != "all" && (
              <IconButton size="sm" variant="text">
                <MdDelete
                  className="text-gray-600"
                  size={20}
                  onClick={() => console.log("confirm delete selected")}
                />
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
