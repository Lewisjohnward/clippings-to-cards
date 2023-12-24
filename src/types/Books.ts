export interface Translation {
  id: string;
  word: string;
  type?: string;
  translation: string[];
}

export interface Details {
  date: Date;
  page: number;
  words: number;
}

export interface Highlights {
  id: string;
  title: string;
  text: string;
  selected: boolean;
  details: Details;
  translations: Translation[];
  // Add translation
  // Add pictures
  // Add images
}

export interface Books {
  id: string;
  imageURL: string;
  rawTitle: string;
  title: string;
  author: string;
  //image
  highlights: Highlights[];
}
