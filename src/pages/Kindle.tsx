import { FcKindle } from "../misc/icons";

export const Kindle = (props: {}) => {
  return (
    <>
      <div className="hidden md:flex justify-center items-center">
        <FcKindle size={300} />
      </div>
      <div className="flex justify-center items-center w-full lg:w-1/4 md:w-1/2 h-full">
        <div className="space-y-4 text-xl px-12 md:px-8 overflow-hidden">
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
    </>
  );
};
