import { useNavigate } from "react-router-dom";
import { FcKindle } from "../misc/icons";
import { ChangeEvent, DragEvent } from "react";
import { useBookStore } from "../stores/useBookStore";
import { parseClippings } from "../helpers/parseClippings";

export const Kindle = () => {
  const initialiseBooks = useBookStore((state) => state.initialiseBooks);
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
      initialiseBooks(clippings);
      navigate("/books");
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Throw error "Appears to be an error uploading file"
    if (event.target.files == null) return;
    const [item] = event.target.files;
    // Throw error "Doesn't appear to be text file"
    if (item.type != "text/plain") {
      console.log("Throw error doesn't appear to be a text file");
      return;
    }
    item.text().then((data: string) => {
      const clippings = parseClippings(data);
      initialiseBooks(clippings);
      navigate("/books");
    });
  };

  return (
    <div className="h-full flex justify-center">
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
    <div className="h-full flex justify-center" onDrop={handleDrop}>
      <div className="hidden md:flex justify-center items-center">
        <FcKindle size={300} className="select-none" />
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
