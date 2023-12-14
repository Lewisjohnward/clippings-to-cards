import { useBookStore } from "../stores/useBookStore";

const LANGUAGE = `it`;

export const useTranslate = (highlight: Highlights) => {
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
