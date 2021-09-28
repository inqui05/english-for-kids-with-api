let CATEGORIES_BY_DEFAULT = 2;
let CARDS_BY_DEFAULT = 16;
export const CLIENT = 'https://inqui05-english-for-kids-api.netlify.app';
export const CARD = 'Card';
export const CATEGORY = 'Category';
export const CATEGORIES_PATH = '/api/categories';
export const CARDS_PATH = '/api/cards';
export const PORT = process.env.PORT || 3000;

export const getCategoryID = ():number => ++CATEGORIES_BY_DEFAULT;
export const getCardID = ():number => ++CARDS_BY_DEFAULT;
export const NOT_EXIST = (id: number, type: string): string => `${type} with id=${id} is not exists`;
export const ALREADY_EXIST = (word: string, type: string): string => `${type} "${word}" is already exists`;
export const NOT_FOUND = (type: string): string => `${type} not found`;

export enum Status {
  Ok = 200,
  BadRequest = 400,
  NotFound = 404,
}
