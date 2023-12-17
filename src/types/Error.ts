export type Error = {
  display: boolean;
  message: string;
  type: string;
  acknowledge: () => void;
  confirm: () => void;
  cancel: () => void;
};
