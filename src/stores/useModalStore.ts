import { create } from "zustand";

type Actions = {
  enableModal: ({
    type,
    message,
    confirm,
  }: {
    type: string;
    message: string;
    confirm?: () => void;
  }) => void;
  disableModal: () => void;
};

type Store = {
  enabled: boolean;
  type: string;
  message: string;
  confirm: () => void;
  cancel: () => void;
  actions: Actions;
};

const useModalStore = create<Store>()((set) => ({
  enabled: false,
  type: "",
  message: "",
  confirm: () => null,
  cancel: () => null,

  actions: {
    enableModal: (obj) =>
      set(() => ({
        enabled: true,
        type: obj.type,
        message: obj.message,
        confirm: obj.confirm,
      })),
    disableModal: () =>
      set(() => ({
        enabled: false,
        type: "",
        message: "",
      })),
  },
}));

export const useModalActions = () => useModalStore((state) => state.actions);
export const useModal = () => useModalStore((state) => state);
