import clsx from "clsx";
import { format } from "date-fns";
import { Highlights } from "../types/Books";
import { Checkbox, IconButton } from "@material-tailwind/react";
import { MdDelete } from "../misc/icons";
import { useBookStore } from "../stores/useBookStore";
import { useTranslate } from "../hooks/useTranslate";

export default function Clipping({
  highlight,
  position,
}: {
  highlight: Highlights;
  position: number;
}) {
  const toggleSelected = useBookStore((state) => state.actions.toggleSelected);
  const deleteHighlight = useBookStore(
    (state) => state.actions.deleteHighlight,
  );
  const handleSelect = () => {
    toggleSelected(highlight);
  };
  const handleDeleteHighlight = () => {
    deleteHighlight(highlight);
  };
  const { translate } = useTranslate(highlight);

  const dateddMMyy = format(highlight.details.date, "dd-MM-yy");
  const timeHmmss = format(highlight.details.date, "H:mm:ss");

  return (
    <tr
      className={clsx(
        "",
        (position + 1) % 2 == 0 ? "bg-white" : "bg-yellow-200",
      )}
    >
      <td className="md:p-4 text-xs text-center italic">{position + 1}</td>
      <td className="text-xs text-center italic">
        <div>
          <p>{dateddMMyy}</p>
          <p>{timeHmmss}</p>
        </div>
      </td>
      <td className="text-xs text-center italic">{highlight.details.page}</td>
      <td
        onClick={() => console.log(highlight)}
        className="text-sm md:p-2 space-y-2"
      >
        {highlight.text.split(" ").map((word, i) => (
          <p key={i} className="inline">
            <span
              onClick={translate}
              className="hover:bg-red-200 rounded px-[1px]"
            >
              {word}
            </span>{" "}
          </p>
        ))}
        <Translations highlight={highlight} />
      </td>
      <td>
        <Checkbox
          checked={highlight.selected}
          ripple={false}
          onChange={handleSelect}
          className="h-6 w-6 border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
          crossOrigin={undefined}
        />
      </td>
      <td className="pr-4">
        <IconButton size="sm" variant="outlined">
          <MdDelete size={20} onClick={handleDeleteHighlight} />
        </IconButton>
      </td>
    </tr>
  );
}

const Translations = ({ highlight }: { highlight: Highlights }) => {
  if (highlight.translations.length == 0) return;
  return (
    <div>
      {highlight.translations.map((translation) => {
        return (
          <div key={translation.id}>
            <p className="italic text-xs">
              {translation.word} ({translation.type}) -{" "}
              {translation.translation.join(", ")}
            </p>
          </div>
        );
      })}
    </div>
  );
};
