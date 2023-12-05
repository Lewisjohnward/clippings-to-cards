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
}) {
  const toggleSelected = useBookStore((state) => state.toggleSelected);
  const deleteHighlight = useBookStore((state) => state.deleteHighlight);
  const handleSelect = () => {
    toggleSelected(highlight);
  };
  const handleDeleteHighlight = () => {
    deleteHighlight(highlight);
  };

  return (
    <tr
      className={clsx(
        "",
        (position + 1) % 2 == 0 ? "bg-white" : "bg-yellow-200",
      )}
    >
      <td className="p-4 text-xs text-center italic">{position + 1}</td>
      <td className="text-xs text-center italic">
        <div>
          <p>{"04/12/2023"}</p>
          <p>{"17:52:05"}</p>
        </div>
      </td>
      <td className="text-xs text-center italic">{5}</td>
      <td className="text-sm p-2">{highlight.text}</td>
      <td>
        <Checkbox
          checked={highlight.selected}
          ripple={false}
          onChange={handleSelect}
          className="h-6 w-6 border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
          crossOrigin={undefined}
        />
      </td>
      <td>
        <IconButton size="sm" variant="outlined">
          <MdDelete size={20} onClick={handleDeleteHighlight} />
        </IconButton>
      </td>
    </tr>
  );
}
