import { ChangeEvent, DragEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookActions, useBooks } from "../stores/useBookStore";
import { parseClippings } from "../helpers/parseClippings";

export const useUpload = () => {
  const [display, setDisplay] = useState(false);
  const [message, setMessage] = useState("This is my error message");
  const [type, setType] = useState("confirm");

  const confirm = () => {
    setDisplay(false);
    proceedWithClippings();
  };
  const cancel = () => {
    setDisplay(false);
    cancelClippings();
  };
  const acknowledge = () => {
    setDisplay(false);
  };

  const displayError = (message: string) => {
    setDisplay(true);
    setType("acknowledge");
    setMessage(message);
  };

  const displayConfirmation = (message: string) => {
    setDisplay(true);
    setType("confirm");
    setMessage(message);
  };

  const [dragOver, setDragOver] = useState(false);
  const [clippingsFile, setClippingsFile] = useState<File | null>(null);
  const { initialiseBooks } = useBookActions();
  const books = useBooks();
  const navigate = useNavigate();

  const proceedWithClippings = () => {
    clippingsFile?.text().then((data: string) => {
      const clippings = parseClippings(data);
      initialiseBooks(clippings);
      navigate("/books");
    });
  };

  const cancelClippings = () => {
    setDragOver(false);
    setClippingsFile(null);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    if (event.dataTransfer === null) {
      displayError("Whoops, there has been an error");
      return;
    }

    if (event.dataTransfer.items.length != 1 || !event.dataTransfer.items) {
      displayError("Whoops, I can only handle one file at a time");
      return;
    }

    const [item] = event.dataTransfer.items;
    if (item.type != "text/plain" || item.kind != "file") {
      displayError("Whoops, it doesn't appear to be a text file");
      return;
    }

    // Confirm user wants to override
    if (books.length != 0) {
      const file = item.getAsFile();
      setClippingsFile(file);
      displayConfirmation(
        "It appears there are already some books. Uploading will overwrite",
      );
      return;
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Throw error "Appears to be an error uploading file"
    if (event.target.files == null) return;
    const [item] = event.target.files;
    // Throw error "Doesn't appear to be text file"
    if (item.type != "text/plain") {
      displayError("Whoops, it doesn't appear to be a text file");
      return;
    }

    if (books.length != 0) {
      setClippingsFile(item);
      displayConfirmation(
        "It appears there are already some books. Uploading will overwrite",
      );
      return;
    }

    item.text().then((data: string) => {
      const clippings = parseClippings(data);
      initialiseBooks(clippings);
      navigate("/books");
    });
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

  const error = {
    display,
    message,
    type,
    confirm,
    cancel,
    acknowledge,
  };

  return {
    error,
    events,
    dragOver,
  };
};
