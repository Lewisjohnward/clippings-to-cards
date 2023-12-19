export const getWords = (highlight: string) => {
  const split = highlight
    // .replace(/l'/g, "")
    .replace(/m’/gi, "")
    .replace(/l’/gi, "")
    .replace(/l'/gi, "")
    .replace(/un’/gi, "")
    .replace(/\s+/gi, " ")
    .replace(/[\d,.'’:"”“»«?]|_/g, "")
    .toLowerCase()
    .split(" ");
  return split;
};

export const getUniqueWords = (words: string[]) => {
  return [... new Set(words)]
};
