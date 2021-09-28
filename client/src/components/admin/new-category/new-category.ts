import './new-category.sass';
import { BaseComponent } from '../../base-component';

export class NewCategory extends BaseComponent {
  private readonly head: BaseComponent;

  private readonly title: BaseComponent;

  private readonly add: BaseComponent;

  constructor() {
    super('div', ['admin-category-new']);
    this.head = new BaseComponent('div', ['admin-category-new__head']);
    this.title = new BaseComponent('h3', ['admin-category-new__name'], { inner: 'Create new Category' });
    this.add = new BaseComponent('div', ['admin-category-new__new-category'], { inner: '+' });

    this.head.element.append(this.title.element);
    this.element.append(this.head.element, this.add.element);
  }
}
