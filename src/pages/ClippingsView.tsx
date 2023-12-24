import { Link, NavLink, Route, Routes, useParams } from "react-router-dom";
import Clipping from "../components/Clipping";
import {
  useBookActions,
  useHighlights,
  useSelectedExists,
} from "../stores/useBookStore";
import {
  BiSortAlt2,
  FaDownload,
  HiTranslate,
  MdDelete,
  MdOutlineAnalytics,
  TbCardsFilled,
} from "../misc/icons";
import { Highlights } from "../types/Books";
import { IconButton } from "@material-tailwind/react";
import { format } from "date-fns";
import { getUniqueWords, getWords } from "../helpers/parseWords";
import { useState } from "react";
import clsx from "clsx";
import { TableVirtuoso } from "react-virtuoso";
import { useModalActions } from "../stores/useModalStore";

const allSelected = (highlights: Highlights[]) => {
  return highlights.every((highlight) => highlight.selected === true);
};

export const ClippingsView = () => {
  /* Get id/bookname from params*/
  const [translate, setTranslate] = useState(false);
  const { bookName } = useParams<keyof { bookName: string }>() as {
    bookName: string;
  };
  const highlights = useHighlights(bookName);
  const selectedExists = useSelectedExists(bookName);
  const handleToggleTranslate = () => {
    setTranslate((prev) => !prev);
  };

  if (highlights.length === 0) return <NoClippingsFound />;

  return (
    <div className="flex flex-col w-full px-2 md:px-8 max-w-[1400px]">
      <div className="flex items-center justify-between py-4 bg-white">
        <h2 className="text-md">
          <Link to="/books" className="text-xl underline">
            Books
          </Link>
          {` > ${bookName}`}
        </h2>
        <div className="flex items-center gap-4">
          <Download highlights={highlights} />
          <button
            className={clsx(
              "p-1 rounded hover:opacity-40",
              translate ? "text-blue-300" : "text-gray-700",
            )}
            onClick={handleToggleTranslate}
          >
            <HiTranslate className="text-4xl" />
          </button>
          <NavLink
            to={`/books/${bookName}/analysis`}
            className={({ isActive }) => {
              return isActive ? "hidden" : "block";
            }}
          >
            <MdOutlineAnalytics className="text-4xl select-none p-1 text-gray-700 rounded hover:bg-black/20" />
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
      </div>
      <div className="py-2 space-y-2">
        <p>Download the selected highlights as:</p>
        <div className="space-x-2">
          <button
            className="px-4 py-2 bg-yellow-400 rounded text-gray-800 disabled:text-opacity-40"
            disabled={selectedExists}
          >
            Plain CSV
          </button>
        </div>
      </div>
      <Routes>
        <Route
          path="clippings"
          element={
            <ClippingTable
              bookName={bookName}
              highlights={highlights}
              translate={translate}
            />
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
const WORDS = "words";

const ClippingTable = ({
  bookName,
  highlights,
  translate,
}: {
  bookName: string;
  highlights: Highlights[];
  translate: boolean;
}) => {
  const { toggleSelectAll, sort, deleteSelected } = useBookActions();
  const selectedExists = useSelectedExists(bookName);
  const { enableModal } = useModalActions();

  const handleToggleSelectAll = () => {
    toggleSelectAll(bookName);
  };
  return (
    <TableVirtuoso
      overscan={{ main: 2000, reverse: 2000 }}
      data={highlights}
      fixedHeaderContent={() => (
        <tr className="bg-yellow-50">
          <th className="px-2 py-4">#</th>
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
          <th className="hidden md:table-cell px-2 hover:underline">
            <button
              onClick={() => sort(bookName, WORDS)}
              className="w-full flex justify-center items-center"
            >
              Words
              <BiSortAlt2 />
            </button>
          </th>
          <th style={{ width: "100%" }}>Text</th>
          <th className="pr-4">
            {bookName != "selected" && bookName != "all" && (
              <input
                checked={allSelected(highlights)}
                onChange={handleToggleSelectAll}
                id="checked-checkbox"
                type="checkbox"
                className="text-gray-600 bg-gray-100 border-gray-300 rounded ring-none select-none cursor-pointer"
              />
            )}
          </th>
          <th className="pr-4">
            {bookName != "selected" && bookName != "all" && (
              <IconButton
                size="sm"
                variant="text"
                disabled={selectedExists}
                onClick={() =>
                  enableModal({
                    type: "confirm",
                    message:
                      "Are you sure you want to delete the selected clippings?",
                    confirm: () => deleteSelected(bookName),
                  })
                }
              >
                <MdDelete className="text-gray-600" size={20} />
              </IconButton>
            )}
          </th>
        </tr>
      )}
      itemContent={(index, highlight) => (
        <Clipping
          highlight={highlight}
          position={index}
          translate={translate}
        />
      )}
    />
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
    // get selected highlights
    const selectedHighlights = highlights.filter(
      (highlight) => highlight.selected,
    );
    // text content
    const texts = selectedHighlights.map((highlight) => {
      const translations = highlight.translations
        .map((tr) =>
          [tr.word, "-", tr.type, "-", ...tr.translation, "<br>"].join(" "),
        )
        .join(" ");

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
      <button className="text-gray-700" onClick={handleDownload}>
        <FaDownload className="text-2xl" />
      </button>
    </>
  );
};
