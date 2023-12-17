import { useState } from "react";
import { Error } from "../types/Error";

type SetErrorType = {
  displayError: (message: string) => void;
  displayConfirmation: (message: string) => void;
};

export const useError = (): { error: Error; setErrorType: SetErrorType } => {
  const [display, setDisplay] = useState(false);
  const [message, setMessage] = useState("This is my error message");
  const [type, setType] = useState("confirm");

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

  const acknowledge = () => {
    setDisplay(false);
  };

  const error = {
    display,
    message,
    type,
    acknowledge,
    confirm: () => null,
    cancel: () => null
  };

  const setErrorType = {
    displayError,
    displayConfirmation,
  };

  return {
    error,
    setErrorType,
  };
};
