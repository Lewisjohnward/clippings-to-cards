import { MouseEvent } from "react";
import { useBookActions } from "../stores/useBookStore";
import { Highlights, Translation } from "../types/Books";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

interface Definition {
  pos: string;
  tr: {
    fr: number;
    pos: string;
    text: string;
  }[];
}

export const useClipping = (highlight: Highlights) => {
  // const [translationButtonsVisible, setTranslationButtonsVisible] = useState(false);
  const { toggleSelected, deleteHighlight, appendTranslation } =
    useBookActions();
  const handleToggleSelect = () => {
    toggleSelected(highlight);
  };
  const handleDelete = () => {
    deleteHighlight(highlight);
  };
  const handleTranslate = (e: MouseEvent<HTMLElement>) => {
    const word = (e.target as HTMLElement).innerText;

    const LANGUAGE = `it`;
    const str = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?=&flags=4&key=dict.1.1.20231202T165200Z.f37a0db6c660a327.38c38e5f1732bcdf6faea905077ad49744d61e3d&lang=${LANGUAGE}-en&text=${word}`;

    fetch(str)
      .then((res) => res.json())
      .then((data) => {
        const translation: Translation = {
          id: uuidv4(),
          word,
          type: "?",
          translation: [],
        };
        console.log(data);

        if (data.def.length != 0) {
          data.def.forEach((definition: Definition) => {
            const translation: Translation = {
              id: uuidv4(),
              word,
              type: "?",
              translation: [],
            };
            translation.type = definition.pos;

            definition.tr.forEach((tr) => {
              translation.translation.push(tr.text);
            });
            appendTranslation(highlight, translation);
          });
        } else {
          translation.translation.length == 0 &&
            translation.translation.push("unable to find translation");

          appendTranslation(highlight, translation);
        }
      })
      .catch((error) => console.log(error));
  };
  const date = format(highlight.details.date, "dd-MM-yy");
  const time = format(highlight.details.date, "H:mm:ss");

  return {
    handleTranslate,
    handleToggleSelect,
    handleDelete,
    date,
    time,
    // translationButtonsVisible,
  };
};
