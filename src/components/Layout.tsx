import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { SiteIcon } from "@/misc/icons";
import { useBooks } from "@/stores/useBookStore";

const disabledLink = "opacity-20 pointer-events-none underline";
const enabledLink = "hover:opacity-40";

export const Layout = ({ children }: { children: ReactNode }) => {
  const books = useBooks();
  return (
    <div className="flex flex-col h-[100dvh]">
      <header className="bg-yellow-400 justify-between items-center gap-4 px-2 py-2 md:px-10">
        <nav>
          <ul className="flex-grow flex gap-4 items-center">
            <li className="flex-grow">
              <NavLink
                to="/"
                className={({ isActive }) => {
                  const baseStyle = "flex gap-2 max-w-fit";
                  if (isActive) return `${baseStyle} pointer-events-none`;
                  else return `${baseStyle} hover:opacity-40`;
                }}
              >
                <SiteIcon />
                <h1 className="text-bold text-xl">Clippings to Cards</h1>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/books"
                className={({ isActive }) => {
                  if (isActive) return disabledLink;
                  if (books.length === 0)
                    return "opacity-20 pointer-events-none";
                  return enabledLink;
                }}
                end
              >
                Books
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/upload"
                className={({ isActive }) => {
                  if (isActive) return disabledLink;
                  return enabledLink;
                }}
              >
                Upload clippings
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
        {children}
    </div>
  );
};
