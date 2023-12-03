import { Link, useParams } from "react-router-dom";
import Clipping from "../components/Clipping";
import { useBookStore } from "../stores/useBookStore";
import { getHighlights } from "../helpers/getHighlights";
import { FaDownload } from "../misc/icons";
import { Highlights } from "../types/Books";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

export const ClippingsView = () => {
  const { id: bookName } = useParams();
  const books = useBookStore((state) => state.books);
  if (bookName === undefined) return;
  const highlights = getHighlights(books, bookName);
  if (highlights === undefined) return <NoBooksFound />;

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-4 bg-white shadow-lg">
        <h2 className="text-xl">
          <Link to="/books" className="underline">
            Books
          </Link>
          {` > ${bookName}`}
        </h2>
        {bookName === "selected" && highlights.length > 0 && (
          <Selected highlights={highlights} />
        )}
      </div>
      <div className="flex-grow rounded overflow-hidden bg-lime-50">
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={highlights.length}
              itemSize={200}
              width={width}
            >
              {({ index, style }) => {
                return (
                  <div style={style}>
                    <Clipping
                      bookName={bookName}
                      highlight={highlights[index]}
                      position={index}
                    />
                  </div>
                );
              }}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};
// {({ index, style }) => {
//   return (
//     <div style={style}>
//       <Clipping
//         bookName={bookName}
//         highlight={highlights[index]}
//         position={index}
//       />
//     </div>
//   );
// }}

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
