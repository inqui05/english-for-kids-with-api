import { Card } from '../components/game/card/card';
import { CardData } from './types';

export const LOCAL_STORAGE_NAME = 'inqui05-english';

export enum COLUMNS {
  CATEGORY = 'category',
  WORD = 'word',
  TRANSLATION = 'translation',
  TRAIN = 'train',
  CORRECT = 'correct',
  WRONG = 'wrong',
  PERCENT = 'percent',
}

export const PASS = 'admin';
export const SET = 'set';
export const WORDS = 'admin-';
export const defaultImage = 'https://raw.githubusercontent.com/inqui05/files-for-app/main/img/image.jpg';
export const shuffleArray = (arr: Card[]): Array<Card> => arr.splice(0).sort(() => Math.random() - 0.5);
export const getCards = (data: CardData[], id: number): CardData[] => data.filter((item) => item.categoryId === id);

export const returnString = (result: number):string => {
  if (!result) return 'you have not made any mistakes!';
  if (result === 1) return `you've made ${result} mistake!`;
  return `you've made ${result} mistakes!`;
};

export const getSoundName = (name: string): string => {
  const devideNameWithSlash = name.split('/');
  return devideNameWithSlash[devideNameWithSlash.length - 1];
};

export const addToLocalStorage = (result: boolean):void => {
  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify({ auth: result }));
};

export const checkAuthorization = (): boolean => {
  if (localStorage.getItem(LOCAL_STORAGE_NAME)) {
    const storageData = localStorage.getItem(LOCAL_STORAGE_NAME);
    let auth = false;

    if (storageData) auth = JSON.parse(storageData).auth;
    if (auth) {
      return true;
    }
  }
  return false;
};

export const getInputValue = async (element: HTMLInputElement): Promise<string> => new Promise((resolve) => {
  if (element.files?.length) {
    const file = element.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
    };
  } else {
    resolve('');
  }
});

export const leaveAdminPanel = (): void => {
  addToLocalStorage(false);
  document.location.hash = '#/';
};
