import { FcKindle } from "../misc/icons";

export const Kindle = () => {
  const handleDragEnd = (event) => {
    event.preventDefault();
    console.log("Drag end");
  };
  const handleDrag = (event) => {
    event.preventDefault();
    console.log("Drag");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.items) {
      console.log(event.dataTransfer.items);
      console.log(event.dataTransfer.items[0].getAsFile());
    }
    //   if (ev.dataTransfer.items) {
    //   // Use DataTransferItemList interface to access the file(s)
    //   [...ev.dataTransfer.items].forEach((item, i) => {
    //     // If dropped items aren't files, reject them
    //     if (item.kind === "file") {
    //       const file = item.getAsFile();
    //       console.log(`… file[${i}].name = ${file.name}`);
    //     }
    //   });
    // } else {
    //   // Use DataTransfer interface to access the file(s)
    //   [...ev.dataTransfer.files].forEach((file, i) => {
    //     console.log(`… file[${i}].name = ${file.name}`);
    //   });
    // }
    console.log("drop");
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    console.log("Drag over");
  };

  return (
    <>
      <div
        className="hidden md:flex justify-center items-center"
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
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
