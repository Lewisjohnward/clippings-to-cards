import { Books, Details } from "../types/Books";
import { v4 as uuidv4 } from "uuid";

export const parseClippings = (data: string) => {
  const replaced = data.replace(/\ufeff/g, "");
  let array = replaced
    .split("\r\n")
    .filter((el) => el.length != 0 && el != "==========");
  array = removeBookmarks(array);

  const clippings: Books[] = [];

  let currentBook = "";
  let details = {
    date: new Date(),
    page: 0,
  };
  array.forEach((el, i) => {
    if (isTitle(i)) {
      currentBook = el;
      const newObj = handleTitle(clippings, currentBook);
      if (newObj == undefined) return;
      else clippings.push(newObj);
      return;
    }
    if (isDetails(i)) {
      details = handleDetails(el);
      return;
    }
    if (isHighlight(i)) {
      handleHighlight(clippings, currentBook, details, el);
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

const handleDetails = (details: string) => {
  // - La tua evidenziazione a pagina 477 | posizione 7312-7314 | Aggiunto in data lunedì 20 novembre 2023 23:50:21
  const segments = details.split("|");

  // Get page
  const pageRegex = /\d+/;
  const extracted = segments[0].match(pageRegex);
  const page = extracted != null ? parseInt(extracted[0]) : 0;

  // Get date
  const dateStr = segments[2].replace(/\sAggiunto in data\s/, "");
  const splitDate = dateStr.split(" ");
  const year = parseInt(splitDate[3]);
  const month = getMonth(splitDate[2]);
  const day = parseInt(splitDate[1]);

  // Get time
  const splitTime = splitDate[4].split(":");
  const hour = parseInt(splitTime[0]);
  const minute = parseInt(splitTime[1]);
  const second = parseInt(splitTime[2]);

  const date = new Date(year, month, day, hour, minute, second, 0);
  return { date, page };
};

const getMonth = (monthStr: string) => {
  switch (monthStr) {
    case "gennaio": {
      return 0;
    }
    case "febbraio": {
      return 1;
    }
    case "marzo": {
      return 2;
    }
    case "aprile": {
      return 3;
    }
    case "maggio": {
      return 4;
    }
    case "giugno": {
      return 5;
    }
    case "luglio": {
      return 6;
    }
    case "agosto": {
      return 7;
    }
    case "settembre": {
      return 8;
    }
    case "ottobre": {
      return 9;
    }
    case "novembre": {
      return 10;
    }
    case "dicembre": {
      return 11;
    }
    default:
      return 0;
  }
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
  details: Details,
  text: string,
) => {
  clippings.find((clipping, i) => {
    if (clipping.rawTitle == rawTitle) {
      const id = uuidv4();
      const selected = false;
      const title = clipping.title;
      const highlightObj = {
        text,
        title,
        id,
        selected,
        details,
        translations: [],
      };
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
