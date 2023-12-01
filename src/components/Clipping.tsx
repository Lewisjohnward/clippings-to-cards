import clsx from "clsx";
import { Highlights } from "../types/Books";
import { Checkbox, IconButton } from "@material-tailwind/react";
import { MdDelete } from "../misc/icons";

export default function Clipping({
  highlight,
  count,
}: {
  highlight: Highlights;
  count: number;
}) {
  const handleSelect = () => {
    console.log("hello");
  };

  return (
    <div
      key={highlight.id}
      className={clsx(
        "flex justify-between items-center gap-4 p-2 shadow-lg",
        count % 2 == 0 ? "bg-white" : "bg-yellow-200",
      )}
    >
      <div className="flex items-center gap-4 ">
        <p>{count}</p>
        <p>{highlight.text}</p>
      </div>
      <div className="flex items-center justify-center">
        <Checkbox
          ripple={false}
          onChange={handleSelect}
          className="h-6 w-6 border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
          crossOrigin={undefined}
        />
        <IconButton size="sm" variant="outlined">
          <MdDelete size={20} />
        </IconButton>
      </div>
    </div>
  );
}
