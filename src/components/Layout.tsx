import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { TbCardsFilled } from "../misc/icons";
import { Footer } from "./Footer";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col h-[100dvh] bg-amber-300 px-10 py-5 gap-5">
      <div className="flex justify-between items-center gap-4">
        <Link to="/" className="flex gap-4">
          <h1 className="text-bold text-xl">Clippings to Cards</h1>
          <TbCardsFilled size={30} />
        </Link>
        <div className="flex gap-4 items-center underline">
          <Link to="/books">Books</Link>
          <Link to="/kindle">Upload clippings</Link>
        </div>
      </div>
      <div className="flex-grow border-8 border-dashed border-black overflow-scroll">
        {children}
      </div>
      <Footer />
    </div>
  );
};
