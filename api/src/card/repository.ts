import { Card } from '../common/types';
import {
  ALREADY_EXIST, CARD, getCardID, NOT_EXIST, NOT_FOUND,
} from '../common/vars';

export const cards: Card[] = [
  {
    id: 1,
    categoryId: 1,
    word: 'apple',
    translation: 'яблоко',
    image: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/img/apple.jpg',
    audioSrc: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/audio/apple.mp3',
  },
  {
    id: 2,
    categoryId: 1,
    word: 'banana',
    translation: 'банан',
    image: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/img/banana.jpg',
    audioSrc: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/audio/banana.mp3',
  },
  {
    id: 3,
    categoryId: 1,
    word: 'lemon',
    translation: 'лемон',
    image: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/img/lemon.jpg',
    audioSrc: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/audio/lemon.mp3',
  },
  {
    id: 4,
    categoryId: 1,
    word: 'orange',
    translation: 'апельсин',
    image: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/img/orange.jpg',
    audioSrc: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/audio/orange.mp3',
  },
  {
    id: 5,
    categoryId: 1,
    word: 'peach',
    translation: 'персик',
    image: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/img/peach.jpg',
    audioSrc: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/audio/peach.mp3',
  },
  {
    id: 6,
    categoryId: 1,
    word: 'pear',
    translation: 'груша',
    image: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/img/pear.jpg',
    audioSrc: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/audio/pear.mp3',
  },
  {
    id: 7,
    categoryId: 1,
    word: 'pineapple',
    translation: 'ананас',
    image: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/img/pineapple.jpg',
    audioSrc: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/audio/pineapple.mp3',
  },
  {
    id: 8,
    categoryId: 1,
    word: 'pomegranate',
    translation: 'гранат',
    image: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/img/pomegranate.jpg',
    audioSrc: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/audio/pomegranate.mp3',
  },
  {
    id: 9,
    categoryId: 2,
    word: 'blackberry',
    translation: 'яжевика',
    image: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/img/blackberry.jpg',
    audioSrc: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/audio/blackberry.mp3',
  },
  {
    id: 10,
    categoryId: 2,
    word: 'blueberry',
    translation: 'черника',
    image: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/img/blueberry.jpg',
    audioSrc: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/audio/blueberry.mp3',
  },
  {
    id: 11,
    categoryId: 2,
    word: 'currant',
    translation: 'смородина',
    image: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/img/currant.jpg',
    audioSrc: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/audio/currant.mp3',
  },
  {
    id: 12,
    categoryId: 2,
    word: 'kiwi',
    translation: 'киви',
    image: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/img/kiwi.jpg',
    audioSrc: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/audio/kiwi.mp3',
  },
  {
    id: 13,
    categoryId: 2,
    word: 'persimmon',
    translation: 'хурма',
    image: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/img/persimmon.jpg',
    audioSrc: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/audio/persimmon.mp3',
  },
  {
    id: 14,
    categoryId: 2,
    word: 'raspberry',
    translation: 'малина',
    image: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/img/raspberry.jpg',
    audioSrc: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/audio/raspberry.mp3',
  },
  {
    id: 15,
    categoryId: 2,
    word: 'strawberry',
    translation: 'клубника',
    image: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/img/strawberry.jpg',
    audioSrc: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/audio/strawberry.mp3',
  },
  {
    id: 16,
    categoryId: 2,
    word: 'watermelon',
    translation: 'арбуз',
    image: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/img/watermelon.jpg',
    audioSrc: 'https://raw.githubusercontent.com/inqui05/files-for-app/main/audio/watermelon.mp3',
  },
];

export function createCard(card: Card): Card | Error {
  let checkExistance = false;
  const id = getCardID();
  cards.forEach((elem) => {
    if (elem.categoryId === card.categoryId && elem.word === card.word) checkExistance = true;
  });

  if (checkExistance) return new Error(ALREADY_EXIST(card.word, CARD));

  const newCard = { ...card, id };

  cards.push(newCard);
  return newCard;
}

export function changeCard(card: Card): Card | Error {
  const index = cards.findIndex((item) => item.id === card.id);
  if (index < 0) return new Error(NOT_EXIST(card.id, CARD));

  cards[index] = card;
  return cards[index];
}

export function deleteCard(id: number): void {
  const index = cards.findIndex((card) => card.id === id);
  if (index < 0) throw new Error(NOT_FOUND(CARD));

  cards.splice(index, 1);
}
