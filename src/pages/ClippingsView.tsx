import { Link, useParams } from "react-router-dom";
import Clipping from "../components/Clipping";
import { useBookStore } from "../stores/useBookStore";
import { getHighlights } from "../helpers/getHighlights";
import { FaDownload, SlCalender } from "../misc/icons";
import { Highlights } from "../types/Books";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { CSSProperties, useEffect, useRef } from "react";
import { Checkbox } from "@material-tailwind/react";

export const ClippingsView = () => {
  const rowHeights = useRef({});
  const listRef = useRef(null);
  const { id: bookName } = useParams();
  const books = useBookStore((state) => state.books);
  if (bookName === undefined) return;
  const highlights = getHighlights(books, bookName);
  if (highlights === undefined) return <NoBooksFound />;

  function getRowHeight(index: number) {
    if (!rowHeights.current) return 0;
    return rowHeights.current[index] || 82;
  }

  const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
    const rowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (rowRef.current) {
        setRowHeight(index, rowRef.current.clientHeight);
      }
      // eslint-disable-next-line
    }, [rowRef]);

    return (
      <div style={style}>
        <div ref={rowRef}>
          <Clipping
            bookName={bookName}
            highlight={highlights[index]}
            position={index}
          />
        </div>
      </div>
    );
  };

  function setRowHeight(index: number, size: number) {
    if (!listRef.current) return;
    listRef.current.resetAfterIndex(0);
    rowHeights.current = { ...rowHeights.current, [index]: size };
  }
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-4 bg-white shadow-lg">
        <h2 className="text-xl">
          <Link to="/books" className="underline">
            Books
          </Link>
          {` > ${bookName}`}
        </h2>
        <div className="flex items-center">
          <label>Select all</label>
          <Checkbox
            checked={false}
            ripple={false}
            onChange={() => console.log("I need plugging in")}
            className="h-6 w-6 border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
            crossOrigin={undefined}
          />
          {bookName === "selected" && highlights.length > 0 && (
            <Selected highlights={highlights} />
          )}
        </div>
      </div>
      <div className="flex-grow rounded overflow-hidden bg-lime-50">
        <AutoSizer>
          {({ height, width }) => (
            <List
              className="List"
              height={height}
              itemCount={highlights.length}
              itemSize={getRowHeight}
              ref={listRef}
              width={width}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>
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
