import { ReactNode } from "react";
import { TbCardsFilled, FcKindle } from "../misc/icons";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col h-[100dvh] bg-amber-300 px-10 py-5 gap-5">
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-4">
          <h1 className="text-bold text-xl">Clippings to Cards</h1>
          <TbCardsFilled size={30} />
        </div>
        <FcKindle size={30} />
      </div>
      <div className="flex-grow flex flex-col md:flex-row justify-center items-center border-8 border-dashed border-black">
        {children}
      </div>
      <footer className="text-center">footer</footer>
    </div>
  );
};
