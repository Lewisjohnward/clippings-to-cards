export const removePunctuation = (word: string) => {
  return word
    .replace(/m’/gi, "")
    .replace(/l’/gi, "")
    .replace(/l'/gi, "")
    .replace(/un’/gi, "")
    .replace(/\s+/gi, " ")
    .replace(/[\d,.'’:"”“»«?]|_/g, "")
    .toLowerCase();
};

export const getWords = (highlight: string) => {
  const cleaned = removePunctuation(highlight);
  const split = cleaned.split(" ");
  return split;
};

export const getUniqueWords = (words: string[]) => {
  return [...new Set(words)];
};
