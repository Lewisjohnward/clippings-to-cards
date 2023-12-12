export interface Details {
  date: Date;
  page: number;
}

export interface Highlights {
  id: string;
  title: string;
  text: string;
  selected: boolean;
  details: Details;
  translations: string[];
  // Add translation
  // Add pictures
  // Add images
}

export interface Books {
  id: string;
  rawTitle: string;
  title: string;
  author: string;
  //image
  highlights: Highlights[];
}
