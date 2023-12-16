import { Modal } from "./Modal";

export const Error = ({ confirmation, error }) => {
  return (
    <Modal isOpen={error.display}>
      <p className="text-center">{error.message}</p>
      <div className="flex justify-center gap-4">
        {error.type === "acknowledge" && (
          <Acknowledge acknowledge={error.acknowledge} />
        )}
        {error.type === "confirm" && (
          <Confirm confirm={error.confirm} cancel={error.cancel} />
        )}
      </div>
    </Modal>
  );
};

const Confirm = ({
  confirm,
  cancel,
}: {
  confirm: () => void;
  cancel: () => void;
}) => {
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
