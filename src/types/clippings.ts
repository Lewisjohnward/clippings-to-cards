interface Highlights {
  id: string;
  text: string;
  // Add translation
  // Add pictures
  // Add images
}

export default interface Clippings {
  id: string;
  title: string;
  author: string;
  //image
  highlights: Highlights[];
}
