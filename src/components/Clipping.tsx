import { Highlights } from "../types/Books";
import { IconButton } from "@material-tailwind/react";
import { MdDelete } from "../misc/icons";
import clsx from "clsx";
import { useClipping } from "@/hooks/useClipping";

export default function Clipping({
  highlight,
  position,
}: {
  highlight: Highlights;
  position: number;
}) {
  const { date, time, handleToggleSelect, handleDelete } =
    useClipping(highlight);

  const background = (position + 1) % 2 == 0 ? "bg-yellow-50" : "bg-white";

  return (
    <>
      <td className={clsx("text-xs text-center italic", background)}>
        {position + 1}
      </td>
      <td className={clsx("p-4 text-xs text-center italic", background)}>
        <div>
          <p>{date}</p>
          <p>{time}</p>
        </div>
      </td>
      <td className={clsx("text-xs text-center italic", background)}>
        {highlight.details.page}
      </td>
      <td
        className={clsx(
          "hidden md:table-cell text-xs text-center italic",
          background,
        )}
      >
        {highlight.details.words}
      </td>
      <td className={clsx("text-sm md:p-2 space-y-2 py-1", background)}>
        {highlight.text}
      </td>
      <td className={clsx("pr-4", background)}>
        <input
          checked={highlight.selected}
          onChange={handleToggleSelect}
          id="checked-checkbox"
          type="checkbox"
          className="text-gray-600 bg-gray-100 border-gray-300 rounded ring-none select-none cursor-pointer"
        />
      </td>
      <td className={clsx("pr-4", background)}>
        <IconButton size="sm" variant="text">
          <MdDelete
            className="text-gray-600"
            size={20}
            onClick={handleDelete}
          />
        </IconButton>
      </td>
    </>
  );
}
