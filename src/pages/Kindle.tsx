import { useNavigate } from "react-router-dom";
import { FcKindle } from "../misc/icons";
import { v4 as uuidv4 } from "uuid";
import Clippings from "../types/clippings";
import { Dispatch, DragEvent, SetStateAction } from "react";

const isTitle = (i: number) => i % 3 == 0;
const isHighlight = (i: number) => (i + 1) % 3 == 0;

const getAuthor = (rawTitle: string) => {
  const regExp = /\(([^)]+)\)/;
  const matches = regExp.exec(rawTitle);
  if (matches && matches.length == 2) return matches[1];
};

const getTitle = (rawTitle: string) => {
  const title = rawTitle.replace(/\([^()]*\)/g, "").trim();
  return title;
};

const handleTitle = (titles: string[], rawTitle: string) => {
  const author = getAuthor(rawTitle) || "?";
  const title = getTitle(rawTitle);
  if (titles.includes(rawTitle)) return;
  titles.push(rawTitle);
  const obj = { id: uuidv4(), rawTitle, title, author, highlights: [] };
  return obj;
};

const handleHighlight = (
  clippings: Clippings[],
  rawTitle: string,
  highlight: string,
) => {
  clippings.find((clipping, i) => {
    if (clipping.rawTitle == rawTitle) {
      const id = uuidv4();
      const highlightObj = { text: highlight, id: id };
      clippings[i].highlights.push(highlightObj);
      return true;
    }
  });
};

const removeBookmarks = (array: string[]) => {
  const cleanedArray = [];
  let i = 0;
  while (i < array.length) {
    if (array[i].includes("segnalibro")) {
      cleanedArray.pop();
    } else cleanedArray.push(array[i]);
    i++;
  }
  return cleanedArray;
};

const parseClippings = (string: string) => {
  const replaced = string.replace(/\ufeff/g, "");
  let array = replaced
    .split("\r\n")
    .filter((el) => el.length != 0 && el != "==========");
  array = removeBookmarks(array);

  const titles: string[] = [];
  const clippings: Clippings[] = [];

  let currentBook = "";
  array.forEach((el, i) => {
    if (isTitle(i)) {
      currentBook = el;
      const newObj = handleTitle(titles, currentBook);
      if (newObj == undefined) return;
      else clippings.push(newObj);
      return;
    }
    if (isHighlight(i)) {
      handleHighlight(clippings, currentBook, el);
    }
  });
  console.log("titles", titles);
  console.log(clippings);
  return clippings;

  // line 0 title
  // line 1 page | position | date
  // line 2 highlight
  // line 3 title
  // line 4 page
  // line 5 highlight
};

export const Kindle = ({
  setClippings,
}: {
  setClippings: Dispatch<SetStateAction<Clippings[]>>;
}) => {
  const navigate = useNavigate();

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // Throw error "It appears there has been an error"
    if (event.dataTransfer === null) {
      console.log("Throw error It appears there has been an error");
      return;
    }

    //Throw error "only one file at a time"
    if (event.dataTransfer.items.length != 1 || !event.dataTransfer.items) {
      console.log("Throw error only one file at a time");
      return;
    }

    const item = event.dataTransfer.items[0];
    // Throw error "Doesn't appear to be a text file"
    if (item.type != "text/plain" || item.kind != "file") {
      console.log("Throw error doesn't appear to be a text file");
      return;
    }

    const file = item.getAsFile();
    if (!file) return;
    file.text().then((data: string) => {
      const clippings = parseClippings(data);
      setClippings(clippings);
      navigate("/books");
    });
  };

  return (
    <div
      className="h-full flex justify-center bg-red-300"
      onDrop={handleDrop}
      // onClick={handleDrop}
    >
      <div className="hidden md:flex justify-center items-center">
        <FcKindle size={300} />
      </div>
      <div className="flex justify-center items-center">
        <div className="space-y-4 text-sm px-12 md:text-lg md:px-8 overflow-hidden">
          <ul className="space-y-4 list-disc">
            <li>
              Drag'n'drop from Kindle Connect your Kindle to the computer via a
              USB cable.
            </li>
            <li>
              Locate the myclippings.txt file on the Kindle disk in documents.
            </li>
            <li>
              Drag and drop the file on this page or click below to upload.
            </li>
          </ul>
          <form>
            <input type="file" />
          </form>
        </div>
      </div>
    </div>
  );
};
