import ReactModal from "react-modal";
import { FcKindle } from "../misc/icons";
import { ChangeEvent, DragEvent } from "react";
import { useUpload } from "../hooks/useUpload";
import clsx from "clsx";

export const Upload = () => {
  const { modal, events, dragOver, proceedWithClippings, cancelClippings } =
    useUpload();

  return (
    <div className="h-full px-4 lg:px-10 bg-yellow-400">
      <div className="h-full flex justify-center border-8 border-black border-dashed">
        {/* Confirm modal */}
        {/* Error modal*/}
        {false && <Loading />}
        <ReactModal
          isOpen={modal.display}
          appElement={document.getElementById("root") || undefined}
          className="text-xl md:w-1/2 xl:w-2/6 p-4 space-y-4 bg-white rounded outline-none shadow-lg"
          overlayClassName="absolute top-0 h-[100dvh] w-screen flex justify-center items-center p-4 bg-black bg-opacity-40"
        >
          <p>{modal.message}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={modal.acknowledge}
              className="bg-green-400 rounded px-4 py-2 text-white"
            >
              Okay
            </button>
            <button
              onClick={cancelClippings}
              className="bg-red-400 rounded px-4 py-2 text-white"
            >
              No
            </button>
          </div>
        </ReactModal>
        <CardDropArea {...events} dragOver={dragOver} />
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
  handleDragOver,
  dragOver,
}: {
  handleDrop: (event: DragEvent<HTMLDivElement>) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleDragOver: (event: DragEvent<HTMLDivElement>) => void;
  dragOver: boolean;
}) => {
  return (
    <>
      <div
        className={clsx(
          "flex-grow flex justify-center",
          dragOver && "opacity-20",
        )}
        onDragOver={handleDragOver}
        onDragExit={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="hidden lg:flex justify-center items-center">
          <FcKindle size={300} className="select-none" />
        </div>
        <div className="flex justify-center items-center">
          <div className="space-y-4 text-sm px-12 md:text-lg md:px-8">
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
              <label
                htmlFor="upload"
                className="bg-white py-2 px-4 border border-black rounded-lg cursor-pointer text-black hover:text-opacity-40"
              >
                <input
                  type="file"
                  id="upload"
                  required
                  className="hidden"
                  onChange={handleChange}
                />
                <span>Select a file</span>
              </label>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
