import './category.sass';
import { BaseComponent } from '../../base-component';
import { InputComponent } from '../../input-component';
import { ButtonComponent } from '../../button-component';
import { Classes, Category } from '../../../shared/types';
import { createCategory, deleteCategory, updateCategory } from '../../../shared/requests';
import { changeCategory, fetchData, store } from '../../../shared/redux';

export class AdminCategory extends BaseComponent {
  private readonly head: BaseComponent;

  private readonly title: BaseComponent;

  private readonly delete: BaseComponent;

  private readonly form: BaseComponent;

  private readonly label: BaseComponent;

  private readonly input: InputComponent;

  private readonly words: BaseComponent;

  private readonly count: BaseComponent;

  private readonly controll: BaseComponent;

  private readonly update: ButtonComponent;

  private readonly add: ButtonComponent;

  private readonly modify: BaseComponent;

  private readonly cancel: ButtonComponent;

  private readonly create: ButtonComponent;

  private id: number;

  constructor(category: string, words: string, id: number) {
    super('div', ['admin-category']);
    this.head = new BaseComponent('div', ['admin-category__head']);
    this.title = new BaseComponent('h3', ['admin-category__name'], { inner: category });
    this.delete = new BaseComponent('div', ['admin-category__close']);
    this.form = new BaseComponent('div', ['admin-category__form', 'hidden']);
    this.label = new BaseComponent('label', ['admin-category__label'], { inner: 'Category Name:' });
    this.input = new InputComponent(['admin-category__input'], { type: 'type', value: category });
    this.words = new BaseComponent('div', ['admin-category__words'], { inner: 'words: ' });
    this.count = new BaseComponent('span', ['admin-category__count'], { inner: words });
    this.controll = new BaseComponent('div', ['admin-category__control']);
    this.update = new ButtonComponent(['admin-category__button'], { name: 'Update' });
    this.add = new ButtonComponent(['admin-category__button'], { name: 'Add word' });
    this.modify = new BaseComponent('div', ['admin-category__modify', 'hidden']);
    this.cancel = new ButtonComponent(['admin-category__change', 'admin-category__cancel'], { name: 'Cancel' });
    this.create = new ButtonComponent(['admin-category__change', 'admin-category__create'], { name: 'Create' });
    this.id = id;

    this.update.element.addEventListener('click', () => this.changingMode());
    this.cancel.element.addEventListener('click', () => this.usualView());
    this.delete.element.addEventListener('click', async () => this.removeThisCategory());
    this.create.element.addEventListener('click', () => this.changeCategory());
    this.add.element.addEventListener('click', () => this.goToCategoryWords());

    this.head.element.append(this.title.element, this.delete.element);
    this.form.element.append(this.label.element, this.input.element);
    this.words.element.append(this.count.element);
    this.controll.element.append(this.update.element, this.add.element);
    this.modify.element.append(this.cancel.element, this.create.element);
    this.element.append(this.head.element, this.form.element, this.words.element, this.controll.element,
      this.modify.element);
  }

  changingMode():void {
    this.head.element.classList.add(Classes.hidden);
    this.words.element.classList.add(Classes.hidden);
    this.controll.element.classList.add(Classes.hidden);
    this.delete.element.classList.add(Classes.hidden);
    this.form.element.classList.remove(Classes.hidden);
    this.modify.element.classList.remove(Classes.hidden);
  }

  usualView():void {
    if (!this.title.element.innerHTML) {
      this.element.remove();
    } else {
      this.head.element.classList.remove(Classes.hidden);
      this.words.element.classList.remove(Classes.hidden);
      this.controll.element.classList.remove(Classes.hidden);
      this.delete.element.classList.remove(Classes.hidden);
      this.form.element.classList.add(Classes.hidden);
      this.modify.element.classList.add(Classes.hidden);
    }
  }

  get ID():number {
    return this.id;
  }

  async removeThisCategory():Promise<void> {
    const result = await deleteCategory(this.id);
    if (result.status) {
      this.element.remove();
      fetchData();
    }
  }

  async changeCategory(): Promise<void> {
    const newName = this.input.element.value;
    if (newName.length > 2 && this.id !== 0) {
      const result = await updateCategory(this.id, { id: this.id, name: newName });

      this.applyСhanges(result);
    } else if (newName.length > 2 && this.id === 0) {
      const result = await createCategory({ id: this.id, name: newName });

      this.applyСhanges(result);
      this.count.element.innerHTML = '0';
    }
  }

  applyСhanges(result: Category): void {
    this.title.element.innerHTML = result.name;
    this.input.element.value = result.name;
    this.id = result.id;
    this.usualView();
    fetchData();
  }

  goToCategoryWords():void {
    store.dispatch(changeCategory(this.id));
    document.location.hash = `#/admin-${this.id}`;
  }
}
