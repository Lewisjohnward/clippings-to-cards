import { useNavigate } from "react-router-dom";
import { FcKindle } from "../misc/icons";
import { v4 as uuidv4 } from "uuid";
import Clippings from "../types/clippings";
import { ChangeEvent, Dispatch, DragEvent, SetStateAction } from "react";

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

const handleTitle = (clippings: Clippings[], rawTitle: string) => {
  if (clippings.some((clipping) => clipping.rawTitle === rawTitle)) return;

  const author = getAuthor(rawTitle) || "?";
  const title = getTitle(rawTitle);
  const obj = { id: uuidv4(), rawTitle, title, author, highlights: [] };
  return obj;
};

const handleHighlight = (
  clippings: Clippings[],
  rawTitle: string,
  text: string,
) => {
  clippings.find((clipping, i) => {
    if (clipping.rawTitle == rawTitle) {
      const id = uuidv4();
      const selected = false;
      const highlightObj = { text, id, selected };
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

  const clippings: Clippings[] = [];

  let currentBook = "";
  array.forEach((el, i) => {
    if (isTitle(i)) {
      currentBook = el;
      const newObj = handleTitle(clippings, currentBook);
      if (newObj == undefined) return;
      else clippings.push(newObj);
      return;
    }
    if (isHighlight(i)) {
      handleHighlight(clippings, currentBook, el);
    }
  });
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

    const [item] = event.dataTransfer.items;
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Throw error "Appears to be an error uploading file"
    if (event.target.files == null) return;
    const [item] = event.target.files;
    console.log(item);
    // Throw error "Doesn't appear to be text file"
    if (item.type != "text/plain") {
      console.log("Throw error doesn't appear to be a text file");
      return;
    }
    item.text().then((data: string) => {
      const clippings = parseClippings(data);
      setClippings(clippings);
      navigate("/books");
    });

    console.log(event.target.files[0]);
    // console.log(event);
  };

  return (
    <div className="h-full flex justify-center bg-red-400">
      {false && <Loading />}
      <CardDropArea handleDrop={handleDrop} handleChange={handleChange} />
    </div>
  );
};

const Loading = () => {
  return (
    <div>
      <div>...loading</div>
    </div>
  );
};

const CardDropArea = ({
  handleDrop,
  handleChange,
}: {
  handleDrop: (event: DragEvent<HTMLDivElement>) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="h-full flex justify-center bg-red-300" onDrop={handleDrop}>
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
            <input onChange={handleChange} type="file" />
          </form>
        </div>
      </div>
    </div>
  );
};
