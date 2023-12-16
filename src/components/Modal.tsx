import { ReactNode } from "react";
import ReactModal from "react-modal";

export const Modal = ({ modal }) => {
  return (
    <_Modal isOpen={modal.display}>
      <p className="text-center">{modal.message}</p>
      <div className="flex justify-center gap-4">
        {modal.type === "acknowledge" && (
          <Acknowledge acknowledge={modal.acknowledge} />
        )}
        {modal.type === "confirm" && (
          <Confirm confirm={modal.confirm} cancel={modal.cancel} />
        )}
      </div>
    </_Modal>
  );
};

const Confirm = ({
  confirm,
  cancel,
}: {
  confirm: () => void;
  cancel: () => void;
}) => {
  console.log("hello");
  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={confirm}
        className="bg-green-400 rounded px-4 py-2 text-white"
      >
        Okay
      </button>
      <button
        onClick={cancel}
        className="bg-red-400 rounded px-4 py-2 text-white"
      >
        No
      </button>
    </div>
  );
};

const Acknowledge = ({ acknowledge }: { acknowledge: () => void }) => {
  return (
    <button
      onClick={acknowledge}
      className="bg-green-400 rounded px-4 py-2 text-white"
    >
      Okay
    </button>
  );
};

const _Modal = ({
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
// <ReactModal
//   isOpen={modal.display}
//   appElement={document.getElementById("root") || undefined}
//   className="text-xl md:w-1/2 xl:w-2/6 p-4 space-y-4 bg-white rounded outline-none shadow-lg"
//   overlayClassName="absolute top-0 h-[100dvh] w-screen flex justify-center items-center p-4 bg-black bg-opacity-40"
// >
//   <p>{modal.message}</p>
//   <div className="flex justify-center gap-4">
//     <button
//       onClick={modal.acknowledge}
//       className="bg-green-400 rounded px-4 py-2 text-white"
//     >
//       Okay
//     </button>
//     <button
//       onClick={cancelClippings}
//       className="bg-red-400 rounded px-4 py-2 text-white"
//     >
//       No
//     </button>
//   </div>
// </ReactModal>
