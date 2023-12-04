import clsx from "clsx";
import { Highlights } from "../types/Books";
import { Checkbox, IconButton } from "@material-tailwind/react";
import { MdDelete } from "../misc/icons";
import { useBookStore } from "../stores/useBookStore";

export default function Clipping({
  highlight,
  position,
}: {
  highlight: Highlights;
  position: number;
  bookName: string;
}) {
  const displayDate = useBookStore((state) => state.displayDate);
  const toggleSelected = useBookStore((state) => state.toggleSelected);
  const deleteHighlight = useBookStore((state) => state.deleteHighlight);
  const handleSelect = () => {
    toggleSelected(highlight);
  };
  const handleDeleteHighlight = () => {
    deleteHighlight(highlight);
  };

  return (
    <div
      className={clsx(
        "flex justify-between items-center gap-2 md:gap-4 px-2 md:px-6 py-2",
        (position + 1) % 2 == 0 ? "bg-white" : "bg-yellow-200",
      )}
    >
      <div className="flex-grow flex items-center gap-2 md:gap-8">
        <p>{position + 1}</p>
        <div className="flex items-center gap-4 md:gap-8">
          <p className="text-xs basis-10 text-center opacity-60 italic">
            {new Date().toLocaleString()}
          </p>
          <p className="text-xs basis-auto text-center opacity-60 italic">
            {5}
          </p>
          <p className="text-sm">{highlight.text}</p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Checkbox
          checked={highlight.selected}
          ripple={false}
          onChange={handleSelect}
          className="h-6 w-6 border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
          crossOrigin={undefined}
        />
        <IconButton size="sm" variant="outlined">
          <MdDelete size={20} onClick={handleDeleteHighlight} />
        </IconButton>
      </div>
    </div>
  );
}
