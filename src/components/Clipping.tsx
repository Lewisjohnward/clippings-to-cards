import clsx from "clsx";
import { format } from "date-fns";
import { Highlights } from "../types/Books";
import { Checkbox, IconButton } from "@material-tailwind/react";
import { MdDelete } from "../misc/icons";
import { useBookStore } from "../stores/useBookStore";

const LANGUAGE = `it`;

const useTranslate = (highlight: Highlights) => {
  const appendTranslation = useBookStore(
    (state) => state.actions.appendTranslation,
  );
  const translate = (e) => {
    const word = e.target.innerText;

    const str = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?=&flags=4&key=dict.1.1.20231202T165200Z.f37a0db6c660a327.38c38e5f1732bcdf6faea905077ad49744d61e3d&lang=${LANGUAGE}-en&text=${word}`;
    fetch(str)
      .then((res) => res.json())
      .then((data) => {
        let translationObj = [];
        data.def.forEach((definition) => {
          const str = [];
          const originalWord = definition.text;
          const type = definition.pos;
          str.push(originalWord);
          str.push(`(${type})`);
          str.push("--");

          definition.tr.forEach((translation: { text: any }) => {
            console.log(translation.text);
            const trans = translation.text;
            str.push(trans);
          });
          translationObj.push(str);
        });
        if (translationObj.length == 0)
          console.log("unable to find translation");
        const translationArr = translationObj.map((translation) =>
          translation.join(" "),
        );
        translationArr.forEach((translation) => {
          appendTranslation(highlight, translation);
        });
      })
      .catch((error) => console.log(error));
  };
  return { translate };
};

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
        {highlight.text.split(" ").map((word) => (
          <p className="inline">
            <span
              onClick={translate}
              className="hover:bg-red-200 rounded px-[1px]"
            >
              {word}
            </span>{" "}
          </p>
        ))}
        {highlight.translations.length != 0 && (
          <div>
            {highlight.translations.map((translation) => (
              <p className="italic text-xs">{translation}</p>
            ))}
          </div>
        )}
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
