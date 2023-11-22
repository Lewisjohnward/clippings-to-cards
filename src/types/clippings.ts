interface Highlights {
  id: string;
  text: string;
  // Add translation
  // Add pictures
  // Add images
}

export interface Books {
  id: string;
  title: string;
  author: string;
  //image
  highlights: Highlights[];
}
