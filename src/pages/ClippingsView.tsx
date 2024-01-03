import { Link, useParams } from "react-router-dom";
import { IconButton } from "@material-tailwind/react";
import Clipping from "@/components/Clipping";
import { TableVirtuoso } from "react-virtuoso";
import { format } from "date-fns";
import {
  useBookActions,
  useHighlights,
  useSelectedExists,
} from "@/stores/useBookStore";
import { BiSortAlt2, MdDelete } from "@/misc/icons";
import { Highlights } from "@/types/Books";
import { useModalActions } from "@/stores/useModalStore";

const allSelected = (highlights: Highlights[]) => {
  return highlights.every((highlight) => highlight.selected === true);
};

export const ClippingsView = () => {
  /* Get id/bookname from params*/
  const { bookName } = useParams<keyof { bookName: string }>() as {
    bookName: string;
  };
  const highlights = useHighlights(bookName);
  const selectedExists = useSelectedExists(bookName);

  if (highlights.length === 0) return <NoClippingsFound />;

  return (
    <div className="flex-grow flex flex-col px-2 md:px-8 3xl:px-[500px]">
      <div className="flex items-center justify-between py-4 bg-white">
        <h2 className="text-md">
          <Link to="/books" className="text-xl underline">
            Books
          </Link>
          {` > ${bookName}`}
        </h2>
      </div>
      <div className="py-2 space-y-2">
        <p>Download the selected highlights as:</p>
        <div className="space-x-2">
          <button
            className="px-4 py-2 bg-yellow-400 rounded text-gray-800 disabled:text-opacity-40"
            disabled={selectedExists}
            onClick={() => handleDownload(highlights)}
          >
            Plain CSV
          </button>
        </div>
      </div>
      <ClippingTable bookName={bookName} highlights={highlights} />
    </div>
  );
};

const DATE = "date";
const PAGE = "page";
const WORDS = "words";

const ClippingTable = ({
  bookName,
  highlights,
}: {
  bookName: string;
  highlights: Highlights[];
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
        <Clipping highlight={highlight} position={index} />
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

const handleDownload = (highlights: Highlights[]) => {
  // get selected highlights
  const selectedHighlights = highlights.filter(
    (highlight) => highlight.selected,
  );
  // text content
  const texts = selectedHighlights.map((highlight) => {
    //Need to escape quotes with double quotes
    return `"${highlight.text}"\n`;
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
