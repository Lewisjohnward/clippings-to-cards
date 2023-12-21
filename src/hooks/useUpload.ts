import { ChangeEvent, DragEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookActions, useBooks } from "../stores/useBookStore";
import { parseClippings } from "../helpers/parseClippings";
import { useModalActions } from "../stores/useModalStore";

export const useUpload = () => {
  const { enableModal } = useModalActions();
  const { initialiseBooks } = useBookActions();
  const books = useBooks();
  const navigate = useNavigate();

  const [dragOver, setDragOver] = useState(false);

  const proceedWithClippings = (file: File) => {
    file.text().then((data: string) => {
      const clippings = parseClippings(data);
      initialiseBooks(clippings);
      navigate("/books");
    });
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    if (event.dataTransfer === null) {
      enableModal({
        type: "acknowledge",
        message: "Whoops, there has been an error",
      });
      return;
    }

    if (event.dataTransfer.items.length != 1 || !event.dataTransfer.items) {
      enableModal({
        type: "acknowledge",
        message: "Whoops, I can only handle one file at a time",
      });
      return;
    }

    const [item] = event.dataTransfer.items;
    if (item.type != "text/plain" || item.kind != "file") {
      enableModal({
        type: "acknowledge",
        message: "Whoops, it doesn't appear to be a text file",
      });
      return;
    }

    // Confirm user wants to override
    if (books.length != 0) {
      const file = item.getAsFile() as File;

      enableModal({
        type: "confirm",
        message:
          "It appears there are already some books. Uploading will overwrite",
        confirm: () => proceedWithClippings(file),
      });
      return;
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Throw error "Appears to be an error uploading file"
    if (event.target.files == null) return;
    const [item] = event.target.files;

    // Throw error "Doesn't appear to be text file"
    if (item.type != "text/plain") {
      enableModal({
        type: "acknowledge",
        message: "Whoops, it doesn't appear to be a text file",
      });
      return;
    }

    if (books.length != 0) {
      enableModal({
        type: "confirm",
        message:
          "It appears there are already some books. Uploading will overwrite",
        confirm: () => proceedWithClippings(item),
      });
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

  return {
    events,
    dragOver,
  };
};
