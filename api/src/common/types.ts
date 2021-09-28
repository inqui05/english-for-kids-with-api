export type Category = {
  id: number,
  name: string,
};

export type Card = {
  id: number,
  categoryId: number,
  word: string,
  translation: string,
  audioSrc: string,
  image: string,
};
