import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";
import { FcKindle } from "../misc/icons";
import { ChangeEvent, DragEvent, useState } from "react";
import { useBookActions, useBooks } from "../stores/useBookStore";
import { parseClippings } from "../helpers/parseClippings";

export const Kindle = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const [clippingsFile, setClippingsFile] = useState<File | null>(null);
  const { initialiseBooks } = useBookActions();
  const books = useBooks();
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
    if (books.length != 0) {
      setDisplayModal(true);
      const file = item.getAsFile();
      setClippingsFile(file);
      return;
    }
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

    if (books.length != 0) {
      setDisplayModal(true);
      setClippingsFile(item);
      return;
    }
    item.text().then((data: string) => {
      const clippings = parseClippings(data);
      initialiseBooks(clippings);
      navigate("/books");
    });
  };

  const proceedWithClippings = () => {
    clippingsFile?.text().then((data: string) => {
      const clippings = parseClippings(data);
      setDisplayModal(false);
      initialiseBooks(clippings);
      navigate("/books");
    });
  };

  const cancelClippings = () => {
    setDisplayModal(false);
    setClippingsFile(null);
  };

  return (
    <div className="h-full px-4 lg:px-10 bg-yellow-400">
      <div className="h-full flex justify-center border-8 border-black border-dashed">
        {false && <Loading />}
        <ReactModal
          isOpen={displayModal}
          appElement={document.getElementById("root") || undefined}
          className="text-xl md:w-1/2 xl:w-2/6 p-4 space-y-4 bg-white rounded outline-none shadow-lg"
          overlayClassName="absolute top-0 h-[100dvh] w-screen flex justify-center items-center p-4 bg-black bg-opacity-40"
        >
          <p>
            It appears you already have some clippings, uploading will cause
            these to be overwritten. Are you sure you want to continue?
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={proceedWithClippings}
              className="bg-green-400 rounded px-4 py-2 text-white"
            >
              Yes
            </button>
            <button
              onClick={cancelClippings}
              className="bg-red-400 rounded px-4 py-2 text-white"
            >
              No
            </button>
          </div>
        </ReactModal>
        <CardDropArea handleDrop={handleDrop} handleChange={handleChange} />
      </div>
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
    <>
      <div className="flex-grow flex justify-center" onDrop={handleDrop}>
        <div className="hidden lg:flex justify-center items-center">
          <FcKindle size={300} className="select-none" />
        </div>
        <div className="flex justify-center items-center">
          <div className="space-y-4 text-sm px-12 md:text-lg md:px-8 overflow-hidden">
            <ul className="space-y-4 list-disc">
              <li>
                Drag'n'drop from Kindle Connect your Kindle to the computer via
                a USB cable.
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
    </>
  );
};
