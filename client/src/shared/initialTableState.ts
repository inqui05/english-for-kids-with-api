import { getCards, getCategories } from './requests';
import { GameData } from './types';

export type RowType = {
  category: string,
  word: string,
  translation: string,
  train: string,
  correct: string,
  wrong: string,
  percent: string,
};

export async function getGameData(): Promise<GameData> {
  const categories = await getCategories();
  const cards = await getCards();
  const gameData = { categories, cards };
  return gameData;
}
