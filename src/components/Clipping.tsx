import { Highlights, Translation } from "../types/Books";
import { IconButton } from "@material-tailwind/react";
import { MdDelete, MdOutlineRemoveCircle } from "../misc/icons";
import { useBookActions } from "../stores/useBookStore";
import { useClipping } from "../hooks/useClipping";
import { useState } from "react";
import clsx from "clsx";

export default function Clipping({
  highlight,
  position,
  translate,
}: {
  highlight: Highlights;
  position: number;
  translate: boolean;
}) {
  const {
    date,
    time,
    handleTranslate,
    handleToggleSelect,
    handleDelete,
    // translationButtonsVisible,
  } = useClipping(highlight);

  const background = (position + 1) % 2 == 0 ? "bg-yellow-50" : "bg-white";
  const words = highlight.text.split(" ").length

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
      <td className={clsx("text-xs text-center italic", background)}>
        {words}
      </td>
      <td className={clsx("text-sm md:p-2 space-y-2 py-1", background)}>
        {highlight.text.split(" ").map((word, i) => (
          <p key={i} className="inline">
            {translate ? (
              <span
                onClick={handleTranslate}
                className="py-1 px-[2px] cursor-pointer hover:bg-blue-500 hover:bg-opacity-40"
              >
                {word}
              </span>
            ) : (
              <span className="py-1 px-[2px]">{word} </span>
            )}{" "}
          </p>
        ))}
        <Translations
          highlight={highlight}
          // visible={translationButtonsVisible}
        />
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
