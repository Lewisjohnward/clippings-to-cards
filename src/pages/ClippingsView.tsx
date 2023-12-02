import { Link, useParams } from "react-router-dom";
import Clipping from "../components/Clipping";
import { useBookStore } from "../stores/useBookStore";
import { getHighlights } from "../helpers/getHighlights";
import { FaDownload } from "../misc/icons";
import { Highlights } from "../types/Books";

export const ClippingsView = () => {
  const { id: bookName } = useParams();
  const books = useBookStore((state) => state.books);
  if (bookName === undefined) return;
  const highlights = getHighlights(books, bookName);
  if (highlights === undefined) return <NoBooksFound />;

  return (
    <div>
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
      <div className="rounded overflow-hidden">
        {highlights.map((highlight, position) => {
          return (
            <div key={highlight.id}>
              <Clipping
                bookName={bookName}
                highlight={highlight}
                position={position}
              />
            </div>
          );
        })}
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
