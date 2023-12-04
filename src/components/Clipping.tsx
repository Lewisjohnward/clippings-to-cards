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
        "flex items-center gap-4 p-2",
        (position + 1) % 2 == 0 ? "bg-white" : "bg-yellow-200",
      )}
    >
      <p className="text-xs min-w-[20px] text-center">{position + 1}</p>
      <div>
        <p className="text-xs text-center opacity-60 italic">{"04/12/2023"}</p>
        <p className="text-xs text-center opacity-60 italic">{"17:50:10"}</p>
      </div>
      <p className="text-xs basis-auto text-center opacity-60 italic">{5}</p>
      <p className="text-sm">{highlight.text}</p>
    </div>
  );
}

    //
    //       <label>Select all</label>
    //       <Checkbox
    //         checked={false}
    //         ripple={false}
    //         onChange={() => console.log("I need plugging in")}
    //         className="h-6 w-6 border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
    //         crossOrigin={undefined}
    //       />
    //       {bookName === "selected" && highlights.length > 0 && (
    //         <Selected highlights={highlights} />
    //       )}
    //
    //     <p className="bg-red-100">{position + 1}</p>
    //     <div className="flex items-center gap-4 md:gap-8">
    //       <div className="flex flex-col items-center bg-blue-500">
    //         <p className="text-center opacity-60 italic">{"12/4/2023"}</p>
    //         <p>{"17:20:15"}</p>
    //       </div>
    //       <p className="bg-blue-500 text-center opacity-60 italic">{5}</p>
    //       </div>
    //
    //             <div className="flex items-center justify-center">
    //     <Checkbox
    //       checked={highlight.selected}
    //       ripple={false}
    //       onChange={handleSelect}
    //       className="h-6 w-6 border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
    //       crossOrigin={undefined}
    //     />
    //     <IconButton size="sm" variant="outlined">
    //       <MdDelete size={20} onClick={handleDeleteHighlight} />
    //     </IconButton>
    //   </div>
    //
    //
    //     <div>
    //       <p className="text-xs text-center opacity-60 italic">
    //         {"04/12/2023"}
    //       </p>
    //       <p className="text-xs text-center opacity-60 italic">{"17:50:10"}</p>
    //     </div>
    //     <p className="text-xs basis-auto text-center opacity-60 italic">{5}</p>
    //
    //     <p className="text-sm">{highlight.text}</p>
    //     "flex justify-between items-center gap-2 md:gap-4 px-2 md:px-6 py-2",
    //   <div className="grid grid-cols-2">
    //     <p className="text-xs bg-red-400">{position + 1}</p>
    //     <p className="text-xs text-center opacity-60 italic">{"04/12/2023"}</p>
    //     <p className="text-xs text-center opacity-60 italic">{"17:50:10"}</p>
    //   </div>
    //   <p className="text-sm">{highlight.text}</p>
    // </div>

