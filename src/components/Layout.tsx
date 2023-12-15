import { ReactNode } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { TbCardsFilled } from "../misc/icons";
import { Footer } from "./Footer";
import { useBookStore } from "../stores/useBookStore";

export const Layout = ({ children }: { children: ReactNode }) => {
  const books = useBookStore((state) => state.books);
  return (
    <div className="flex flex-col h-[100dvh]">
      <div className="flex bg-yellow-400 justify-between items-center gap-4 px-2 py-4 md:px-10 md:py-5">
        <Link to="/" className="flex gap-4">
          <h1 className="text-bold text-xl">Clippings to Cards</h1>
          <TbCardsFilled size={30} />
        </Link>
        <div className="flex gap-4 items-center underline">
          <Link
            to="/books"
            className={clsx(
              books.length === 0 && "opacity-20 pointer-events-none",
            )}
          >
            Books
          </Link>
          <Link to="/kindle">Upload clippings</Link>
        </div>
      </div>
      <div className="flex-grow overflow-scroll">{children}</div>
      <Footer />
    </div>
  );
};
