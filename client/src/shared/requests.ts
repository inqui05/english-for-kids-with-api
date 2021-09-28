import { CardData, Category } from './types';

const baseURL = 'https://blooming-refuge-24067.herokuapp.com/';
const path = {
  category: 'api/categories',
  card: 'api/cards',
};

export const getCategories = async (): Promise<Array<Category>> => {
  const response = await fetch(`${baseURL}${path.category}`);
  const data = await response.json();
  return data;
};

export const createCategory = async (category: Category): Promise<Category> => {
  const response = await fetch(`${baseURL}${path.category}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });
  const result = await response.json();
  return result;
};

export const updateCategory = async (id: number, category: Category): Promise<Category> => {
  const response = await fetch(`${baseURL}${path.category}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });
  const result = await response.json();
  return result;
};

export const deleteCategory = async (id: number): Promise<Response> => {
  const response = await fetch(`${baseURL}${path.category}/${id}`, {
    method: 'DELETE',
  });
  return response;
};

export const getCards = async (): Promise<Array<CardData>> => {
  const response = await fetch(`${baseURL}${path.card}`);
  const data = await response.json();
  return data;
};

export const createCard = async (card: CardData): Promise<CardData> => {
  const response = await fetch(`${baseURL}${path.card}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(card),
  });
  const result = await response.json();
  return result;
};

export const updateCard = async (id: number, card: CardData): Promise<CardData> => {
  const response = await fetch(`${baseURL}${path.card}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(card),
  });
  const result = await response.json();
  return result;
};

export const deleteCard = async (id: number): Promise<Response> => {
  const response = await fetch(`${baseURL}${path.card}/${id}`, {
    method: 'DELETE',
  });
  return response;
};
