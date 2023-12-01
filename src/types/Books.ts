export interface Highlights {
  id: string;
  text: string;
  selected: boolean;
  // Add translation
  // Add pictures
  // Add images
}

export default interface Books {
  id: string;
  rawTitle: string;
  title: string;
  author: string;
  //image
  highlights: Highlights[];
}