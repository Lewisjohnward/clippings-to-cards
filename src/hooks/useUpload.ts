import { ChangeEvent, DragEvent, useEffect, useState } from "react";
import { useBookActions, useBooks } from "../stores/useBookStore";
import { useNavigate } from "react-router-dom";
import { parseClippings } from "../helpers/parseClippings";

export const useUpload = () => {
  const [modal, setModal] = useState({
    display: false,
    type: "acknowledgment",
    message: "",
    acknowledge: () =>
      setModal((prev) => {
        return { ...prev, display: false };
      }),
  });

  const [dragOver, setDragOver] = useState(false);
  const [clippingsFile, setClippingsFile] = useState<File | null>(null);
  const { initialiseBooks } = useBookActions();
  const books = useBooks();
  const navigate = useNavigate();

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    if (event.dataTransfer === null) {
      setModal((prev) => {
        return {
          ...prev,
          type: "acknowledge",
          display: true,
          message: "It appears there has been an error",
        };
      });

      return;
    }

    if (event.dataTransfer.items.length != 1 || !event.dataTransfer.items) {
      setModal((prev) => {
        return {
          ...prev,
          display: true,
          type: "acknowledge",
          message: "Whoops, only one file at a time",
        };
      });
      return;
    }

    const [item] = event.dataTransfer.items;
    if (item.type != "text/plain" || item.kind != "file") {
      setModal((prev) => {
        return {
          ...prev,
          display: true,
          type: "acknowledge",
          message: "Whoops, it doesn't appear to be a text file",
        };
      });
      return;
    }

    // Confirm user wants to override
    if (books.length != 0) {
      setModal(() => {
        return {
          type: "confirm",
          display: true,
          message:
            "It appears there are already some clippings, uploading will replace them, do you want to proceed?",
          confirm: () => proceedWithClippings(),
          cancel: () => cancelClippings(),
        };
      });
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
      setClippingsFile(item);
      setModal({
        file: item,
        type: "confirm",
        display: true,
        message:
          "testIt appears there are already some clippings, uploading will replace them, do you want to proceed?",
        confirm: proceedWithClippings,
        cancel: cancelClippings,
      });
      return;
    }

    item.text().then((data: string) => {
      const clippings = parseClippings(data);
      initialiseBooks(clippings);
      navigate("/books");
    });
  };

  useEffect(() => {
    console.log("clippings file changed");
    console.log(clippingsFile);
  }, [clippingsFile]);

  const proceedWithClippings = () => {
    console.log("proceed");
    clippingsFile?.text().then((data: string) => {
      console.log(data);
      const clippings = parseClippings(data);
      setModal({ display: false });
      initialiseBooks(clippings);
      navigate("/books");
    });
  };

  const cancelClippings = () => {
    setModal({ display: false });
    setDragOver(false);
    setClippingsFile(null);
  };

  const handleDragOver = (event: DragEvent) => {
    switch (event.type) {
      case "dragover":
        setDragOver(true);
        break;
      case "dragexit":
        setDragOver(false);
        break;
    }
  };

  const events = {
    handleDrop,
    handleChange,
    handleDragOver,
  };

  return {
    modal,
    events,
    dragOver,
    proceedWithClippings,
    cancelClippings,
  };
};
