export type Input = {
  type: string,
  placeholder?: string,
  required?: boolean,
  value?: string,
  id?: string
};

export type Button = {
  name: string,
  disabled?: boolean
};

export type Anchor = {
  href: string,
  text?: string
};

export type Label = {
  inner: string,
  for: string
};

export type Audio = {
  inner?: string
};

export type CardData = {
  id: number,
  categoryId: number,
  word: string,
  translation: string,
  audioSrc: string,
  image: string,
};

export type Category = {
  id: number,
  name: string,
};

export type GameData = {
  categories: Array<Category>,
  cards: Array<CardData>
};

export enum Classes {
  hidden = 'hidden',
  auth = '.authorization__window',
  disabled = 'disabled',
}
