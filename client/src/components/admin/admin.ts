import './admin.sass';
import { BaseComponent } from '../base-component';
import { AdminCard } from './card/card';
import { getGameData } from '../../shared/initialTableState';
import { AdminCategory } from './category/category';
import { getCards } from '../../shared/commonFunction';
import { NewCategory } from './new-category/new-category';
import { NewCard } from './new-card/new-card';
import { store } from '../../shared/redux';
import { CardData } from '../../shared/types';

export class Admin extends BaseComponent {
  private addCategoryComponent: NewCategory;

  private addCardComponent: NewCard;

  private allCategories: AdminCategory[] = [];

  private allCards: AdminCard[] = [];

  private category = 0;

  constructor() {
    super('div', ['admin']);
    this.addCategoryComponent = new NewCategory();
    this.addCardComponent = new NewCard();

    this.addCategoryComponent.element.addEventListener('click', () => this.addCategory());
    this.addCardComponent.element.addEventListener('click', () => this.addCard());

    store.subscribe(() => {
      const state = store.getState();
      this.category = state.category;
    });
  }

  async addCards(categoryId: number): Promise<void> {
    const data = await getGameData();
    const cards = getCards(data.cards, categoryId);

    cards.forEach((item) => {
      const card = new AdminCard(item);

      this.allCards.push(card);
      this.element.prepend(card.element);
    });

    this.element.append(this.addCardComponent.element);
  }

  async addCategories(): Promise<void> {
    const data = await getGameData();
    const { categories, cards } = data;

    categories.forEach((item) => {
      const cardsCount = getCards(cards, item.id).length;
      const newCategory = new AdminCategory(item.name, String(cardsCount), item.id);

      this.allCategories.push(newCategory);
      this.element.prepend(newCategory.element);
    });

    this.element.append(this.addCategoryComponent.element);
  }

  async addCategory(): Promise<void> {
    const newCategory = new AdminCategory('', '', 0);
    newCategory.changingMode();

    this.allCategories.push(newCategory);
    this.addCategoryComponent.element.before(newCategory.element);
  }

  async addCard(): Promise<void> {
    const newCardData = {
      id: 0, categoryId: this.category, word: '', translation: '', audioSrc: '', image: '',
    } as CardData;
    const newCard = new AdminCard(newCardData);
    newCard.showChangesSide();

    this.addCardComponent.element.before(newCard.element);
  }
}
