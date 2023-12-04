import { Books } from "../types/Books";
import { v4 as uuidv4 } from "uuid";

export const parseClippings = (data: string) => {
  const replaced = data.replace(/\ufeff/g, "");
  let array = replaced
    .split("\r\n")
    .filter((el) => el.length != 0 && el != "==========");
  array = removeBookmarks(array);

  const clippings: Books[] = [];

  let currentBook = "";
  array.forEach((el, i) => {
    if (isTitle(i)) {
      currentBook = el;
      const newObj = handleTitle(clippings, currentBook);
      if (newObj == undefined) return;
      else clippings.push(newObj);
      return;
    }
    if (isDetails(i)) {
      handleDetails(el);
      return;
    }
    if (isHighlight(i)) {
      handleHighlight(clippings, currentBook, el);
    }
  });
  return clippings;

  // line 0 title
  // line 1 page | position | date
  // line 2 highlight
  // line 3 title
  // line 4 page
  // line 5 highlight
};
const isTitle = (i: number) => i % 3 == 0;
const isHighlight = (i: number) => (i + 1) % 3 == 0;
const isDetails = (i: number) => (i - 1) % 3 == 0;

const getAuthor = (rawTitle: string) => {
  const regExp = /\(([^)]+)\)/;
  const matches = regExp.exec(rawTitle);
  if (matches && matches.length == 2) return matches[1];
};

const getTitle = (rawTitle: string) => {
  const title = rawTitle.replace(/\([^()]*\)/g, "").trim();
  return title;
};

const handleDetails = (el: string) => {
  // - La tua evidenziazione a pagina 477 | posizione 7312-7314 | Aggiunto in data lunedì 20 novembre 2023 23:50:21
  const pageRegex = /\d+/;
  const page = el.match(pageRegex)[0];
  console.log(page);

  console.log(el);
};

const handleTitle = (clippings: Books[], rawTitle: string) => {
  if (clippings.some((clipping) => clipping.rawTitle === rawTitle)) return;

  const author = getAuthor(rawTitle) || "?";
  const title = getTitle(rawTitle);
  const obj = { id: uuidv4(), rawTitle, title, author, highlights: [] };
  return obj;
};

const handleHighlight = (
  clippings: Books[],
  rawTitle: string,
  text: string,
) => {
  clippings.find((clipping, i) => {
    if (clipping.rawTitle == rawTitle) {
      const id = uuidv4();
      const selected = false;
      const title = clipping.title;
      const highlightObj = { text, title, id, selected };
      clippings[i].highlights.push(highlightObj);
      return true;
    }
  });
};

const removeBookmarks = (array: string[]) => {
  const cleanedArray = [];
  let i = 0;
  while (i < array.length) {
    if (array[i].includes("segnalibro")) {
      cleanedArray.pop();
    } else cleanedArray.push(array[i]);
    i++;
  }
  return cleanedArray;
};
