import ReactModal from "react-modal";
import { useModal, useModalActions } from "../stores/useModalStore";

export const Modal = () => {
  const { enabled, type, message, confirm } = useModal();
  const { disableModal } = useModalActions();
  return (
    <ReactModal
      isOpen={enabled}
      appElement={document.getElementById("root") || undefined}
      className="text-xl md:w-1/2 xl:w-2/6 p-4 space-y-4 bg-white rounded outline-none shadow-lg"
      overlayClassName="absolute top-0 h-[100dvh] w-screen flex justify-center items-center p-4 bg-black bg-opacity-40"
    >
      <p className="text-center">{message}</p>
      <div className="flex justify-center gap-4">
        {type === "acknowledge" && <Acknowledge disableModal={disableModal} />}
        {type === "confirm" && (
          <Confirm confirm={confirm} disableModal={disableModal} />
        )}
      </div>
    </ReactModal>
  );
};

const Confirm = ({
  confirm,
  disableModal,
}: {
  confirm: () => void;
  disableModal: () => void;
}) => {
  const onConfirm = () => {
    disableModal();
    confirm();
  };

  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={onConfirm}
        className="bg-green-400 rounded px-4 py-2 text-white"
      >
        Okay
      </button>
      <button
        onClick={disableModal}
        className="bg-red-400 rounded px-4 py-2 text-white"
      >
        No
      </button>
    </div>
  );
};

const Acknowledge = ({ disableModal }: { disableModal: () => void }) => {
  return (
    <button
      onClick={disableModal}
      className="bg-green-400 rounded px-4 py-2 text-white"
    >
      Okay
    </button>
  );
};
