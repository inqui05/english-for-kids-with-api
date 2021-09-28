import { cards } from '../card/repository';
import { Category } from '../common/types';
import {
  ALREADY_EXIST, CATEGORY, getCategoryID, NOT_EXIST, NOT_FOUND,
} from '../common/vars';

export const categories: Category[] = [
  {
    id: 1,
    name: 'Fruit',
  },
  {
    id: 2,
    name: 'Berry',
  },
];

export function createCategory(category: Category): Category | Error {
  const checkExistance = categories.find((cat) => cat.name.toLowerCase() === category.name.toLowerCase());
  if (checkExistance) return new Error(ALREADY_EXIST(category.name, CATEGORY));

  const id = getCategoryID();
  const newCategory = { ...category, id };
  categories.push(newCategory);

  return newCategory;
}

export function changeCategory(category: Category): Category | Error {
  const index = categories.findIndex((cat) => cat.id === category.id);
  if (index < 0) return new Error(NOT_EXIST(category.id, CATEGORY));

  categories[index].name = category.name;
  return categories[index];
}

function deleteCardsByCategoryId(categoryId: number): void {
  cards.forEach((elem, index) => {
    if (elem.categoryId === categoryId) cards.splice(index, 1);
  });
}

export function deleteCategory(id: number): void {
  const index = categories.findIndex((cat) => cat.id === id);
  if (index < 0) throw new Error(NOT_FOUND(CATEGORY));

  deleteCardsByCategoryId(id);
  categories.splice(index, 1);
}
