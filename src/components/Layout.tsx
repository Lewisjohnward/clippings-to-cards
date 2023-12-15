import { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { TbCardsFilled } from "../misc/icons";
import { Footer } from "./Footer";
import { useBooks } from "../stores/useBookStore";

const disabledLink = "opacity-20 pointer-events-none";
const enabledLink = "hover:opacity-40";

export const Layout = ({ children }: { children: ReactNode }) => {
  const books = useBooks();
  return (
    <div className="flex flex-col h-[100dvh]">
      <div className="flex bg-yellow-400 justify-between items-center gap-4 px-2 py-4 md:px-10 md:py-5">
        <Link to="/" className="flex gap-4">
          <h1 className="text-bold text-xl">Clippings to Cards</h1>
          <TbCardsFilled size={30} />
        </Link>
        <div className="flex gap-4 items-center underline">
          <NavLink
            to="/books"
            className={({ isActive }) => {
              if (isActive) return disabledLink;
              if (books.length === 0) return disabledLink;
              return enabledLink;
            }}
          >
            Books
          </NavLink>
          <NavLink
            to="/kindle"
            className={({ isActive }) => {
              if (isActive) return disabledLink;
              return enabledLink;
            }}
          >
            Upload clippings
          </NavLink>
        </div>
      </div>
      <div className="flex-grow overflow-scroll">{children}</div>
      <Footer />
    </div>
  );
};
