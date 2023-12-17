import clsx from "clsx";
import { Highlights, Translation } from "../types/Books";
import { Checkbox, IconButton } from "@material-tailwind/react";
import { MdDelete, MdOutlineRemoveCircle } from "../misc/icons";
import { useBookActions } from "../stores/useBookStore";
import { useClipping } from "../hooks/useClipping";
import { useState } from "react";

export default function Clipping({
  highlight,
  position,
}: {
  highlight: Highlights;
  position: number;
}) {
  const {
    date,
    time,
    handleTranslate,
    handleToggleSelect,
    handleDelete,
    // translationButtonsVisible,
  } = useClipping(highlight);

  return (
    <tr
      className={clsx(
        (position + 1) % 2 == 0 ? "bg-white" : "bg-yellow-300/30",
      )}
    >
      <td className="md:p-4 text-xs text-center italic">{position + 1}</td>
      <td className="text-xs text-center italic">
        <div>
          <p>{date}</p>
          <p>{time}</p>
        </div>
      </td>
      <td className="text-xs text-center italic">{highlight.details.page}</td>
      <td
        onClick={() => console.log(highlight)}
        className="text-sm md:p-2 space-y-2 py-1"
      >
        {highlight.text.split(" ").map((word, i) => (
          <p key={i} className="inline">
            <span
              onClick={handleTranslate}
              className="py-1 px-[2px] cursor-pointer hover:bg-blue-500 hover:bg-opacity-40"
            >
              {word}
            </span>{" "}
          </p>
        ))}
        <Translations
          highlight={highlight}
          // visible={translationButtonsVisible}
        />
      </td>
      <td>
        <Checkbox
          checked={highlight.selected}
          ripple={false}
          onChange={handleToggleSelect}
          className="h-6 w-6 border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
          crossOrigin={undefined}
        />
      </td>
      <td className="pr-4">
        <IconButton size="sm" variant="outlined">
          <MdDelete size={20} onClick={handleDelete} />
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
            <Tr highlight={highlight} translation={translation} />
          </div>
        );
      })}
    </div>
  );
};

const Tr = ({
  highlight,
  translation,
}: {
  highlight: Highlights;
  translation: Translation;
}) => {
  const [vis, setVis] = useState(false);
  const { deleteTranslation } = useBookActions();
  return (
    <div
      className="flex gap-2"
      onMouseEnter={() => setVis(true)}
      onMouseLeave={() => setVis(false)}
    >
      {vis && (
        <button onClick={() => deleteTranslation(highlight, translation.id)}>
          <MdOutlineRemoveCircle className="text-red-400 min-w-fit" />
        </button>
      )}
      <p className="italic text-xs">
        {translation.word} ({translation.type}) -{" "}
        {translation.translation.join(", ")}
      </p>
    </div>
  );
};
