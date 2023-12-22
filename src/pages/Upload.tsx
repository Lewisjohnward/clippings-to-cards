import { FcKindle } from "../misc/icons";
import { ChangeEvent, DragEvent } from "react";
import { useUpload } from "../hooks/useUpload";
import clsx from "clsx";

export const Upload = () => {
  const { events, dragOver } = useUpload();

  return (
    <div className="w-full px-4 lg:px-10 bg-yellow-400">
      <div className="h-full flex justify-center border-8 border-gray-800 border-dashed">
        {false && <Loading />}
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
    <div
      className={clsx(
        "relative flex-grow flex justify-center",
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
              Drag'n'drop from Kindle Connect your Kindle to the computer via a
              USB cable.
            </li>
            <li>
              Locate the{" "}
              <span className="py-1 px-2 md:py-2 bg-blue-400 bg-opacity-40">
                "My Clippings.txt"
              </span>{" "}
              file on the Kindle disk in documents.
            </li>
            <li>
              Drag and drop the file on this page or click below to upload.
            </li>
          </ul>
          <form>
            <label
              htmlFor="upload"
              className="py-1 md:py-2 px-4 cursor-pointer bg-blue-400 bg-opacity-40 text-gray-800 hover:text-opacity-40"
            >
              <input
                type="file"
                id="upload"
                required
                className="hidden"
                onChange={handleChange}
              />
              Select a file
            </label>
          </form>
          <p className="text-xs opacity-50">
            {/* <p className="absolute bottom-0 left-0 w-1/2 lg:w-1/6 p-2 text-xs opacity-50"> */}
            Note: the file is processed and stored entirely locally in your
            browser. Your data is not uploaded to any server.
          </p>
        </div>
      </div>
    </div>
  );
};
