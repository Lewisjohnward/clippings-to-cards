import { ReactNode } from "react";
import ReactModal from "react-modal";

export const Modal = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: ReactNode;
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      appElement={document.getElementById("root") || undefined}
      className="text-xl md:w-1/2 xl:w-2/6 p-4 space-y-4 bg-white rounded outline-none shadow-lg"
      overlayClassName="absolute top-0 h-[100dvh] w-screen flex justify-center items-center p-4 bg-black bg-opacity-40"
    >
      {children}
    </ReactModal>
  );
};
