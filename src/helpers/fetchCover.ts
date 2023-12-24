import axios from "axios";

export const fetchCover = async (title: string) => {
  try {
    const { data } = await axios.get(
      `https://openlibrary.org/search.json?q=${title.split(" ").join("+")}`,
    );
    const id = data.docs[0]?.seed[0]?.replace(/.*\//, "");

    if (data.docs[0]) {
      return `https://covers.openlibrary.org/b/olid/${id}-M.jpg`;
    } else return "";
  } catch (error) {
    return "";
  }
};
