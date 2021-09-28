import { defaultImage, getCards } from '../../shared/commonFunction';
import { store } from '../../shared/redux';
import { GameData } from '../../shared/types';
import './categoryWrapper.sass';
import { BaseComponent, Category } from './exports';

export class CategoryWrapper extends BaseComponent {
  constructor() {
    super('div', ['category-wrapper']);

    store.subscribe(() => {
      this.addCategory();
    });
  }

  addCategory():void {
    this.element.innerHTML = '';
    const gameData: GameData = store.getState().result;

    for (let i = 0; i < gameData.categories.length; i++) {
      const category = gameData.categories[i];
      const { id, name } = category;
      const cards = getCards(gameData.cards, id);
      let path;

      if (cards.length > 0) {
        path = cards[0].image;
      } else {
        path = defaultImage;
      }
      const link = `#/set${i + 1}`;

      this.element.append(new Category(name, path, link, id).element);
    }
  }
}
