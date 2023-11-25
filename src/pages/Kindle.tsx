import { useNavigate } from "react-router-dom";
import { FcKindle } from "../misc/icons";
import { v4 as uuidv4 } from "uuid";
import Clippings from "../types/clippings";
import { Dispatch, DragEvent, SetStateAction } from "react";

const isTitle = (i: number) => i % 3 == 0;
const isHighlight = (i: number) => (i + 1) % 2 == 0;

const parseClippings = (string: string) => {
  const replaced = string.replace(/\ufeff/g, "");
  let array = replaced
    .split("\r\n")
    .filter((el) => el.length != 0 && el != "==========");
  array = array.slice(0, 60);

  const titles: string[] = [];
  const obj: Clippings = {} as Clippings;
  obj.highlights = [];

  const clippings: Clippings[] = [];

  let currentBook = "";
  array.forEach((el, i) => {
    if (isTitle(i)) {
      currentBook = el;
      if (titles.includes(currentBook)) return;
      titles.push(currentBook);
      obj.title = currentBook;
      obj.id = uuidv4();
      clippings.push(obj);
      return;
    }
    if (isHighlight(i)) {
      clippings.find((clipping, i) => {
        if (clipping.title == currentBook) {
          const id = uuidv4();
          clippings[i].highlights.push({ text: el, id });
          return true;
        }
      });
    }
  });
  console.log(titles);
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
    if (event.dataTransfer === null) return;
    if (event.dataTransfer.items.length != 1) return;
    if (event.dataTransfer.items) {
      console.log(event.dataTransfer.items);
      console.log(event.dataTransfer.items[0].getAsFile());
    }

    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...event.dataTransfer.items].forEach((item) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (!file) return;
          file.text().then((data: string) => {
            const clippings = parseClippings(data);
            setClippings(clippings);
            navigate("/books");
          });
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...event.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }
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
