import { leaveAdminPanel } from '../../shared/commonFunction';
import { Classes } from '../../shared/types';
import { AnchorComponent } from '../anchor-component';
import { BaseComponent } from '../base-component';
import { ButtonComponent } from '../button-component';
import './header.sass';

export class AdminHeader extends BaseComponent {
  private readonly menu: BaseComponent;

  private readonly list: BaseComponent;

  private readonly categories: BaseComponent;

  private readonly categoriesLink: AnchorComponent;

  private readonly words: BaseComponent;

  private readonly wordsLink: ButtonComponent;

  private readonly logOut: ButtonComponent;

  constructor() {
    super('header', ['admin-header', 'hidden']);
    this.menu = new BaseComponent('nav', ['admin-menu']);
    this.list = new BaseComponent('ul', ['admin-menu__list']);
    this.categories = new BaseComponent('li', ['admin-menu__item']);
    this.categoriesLink = new AnchorComponent(['admin-menu__link'], { href: '#/admin', text: 'Categories' });
    this.words = new BaseComponent('li', ['admin-menu__item']);
    this.wordsLink = new ButtonComponent(['admin-menu__link'], { name: 'Words' });
    this.logOut = new ButtonComponent(['admin-auth__out', 'admin-menu__link'], { name: 'Log out' });

    this.logOut.element.addEventListener('click', () => leaveAdminPanel());

    this.categories.element.append(this.categoriesLink.element);
    this.words.element.append(this.wordsLink.element);
    this.list.element.append(this.categories.element, this.words.element);
    this.menu.element.append(this.list.element);
    this.element.append(this.menu.element, this.logOut.element);
  }

  hideHeader(): void {
    this.element.classList.add(Classes.hidden);
  }

  showHeader(): void {
    this.element.classList.remove(Classes.hidden);
  }

  activeCategories(): void {
    this.categoriesLink.element.classList.add('admin-menu__link_active');
    this.wordsLink.element.classList.remove('admin-menu__link_active');
  }

  activeCards(): void {
    this.categoriesLink.element.classList.remove('admin-menu__link_active');
    this.wordsLink.element.classList.add('admin-menu__link_active');
  }
}
