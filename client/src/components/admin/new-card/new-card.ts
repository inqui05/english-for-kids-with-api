import { BaseComponent } from '../../base-component';
import './new-card.sass';

export class NewCard extends BaseComponent {
  private readonly title: BaseComponent;

  private readonly add: BaseComponent;

  constructor() {
    super('div', ['admin-card']);
    this.title = new BaseComponent('div', ['admin-card__title'], { inner: 'Add new word' });
    this.add = new BaseComponent('div', ['admin-card__add'], { inner: '+' });

    this.element.append(this.title.element, this.add.element);
  }
}
