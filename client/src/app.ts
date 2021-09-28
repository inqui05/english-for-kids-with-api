import './styles.sass';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { CategoryWrapper } from './components/category/categoryWrapper';
import { Game } from './components/game/game';
import { Admin } from './components/admin/admin';
import { checkAuthorization, SET, WORDS } from './shared/commonFunction';
import { AdminHeader } from './components/admin-header/header';

export class App {
  private readonly header: Header;

  private readonly footer: Footer;

  private readonly categories: CategoryWrapper;

  private readonly game: Game;

  private readonly admin: Admin;

  private readonly adminHeader: AdminHeader;

  constructor(private readonly root: Element) {
    this.header = new Header();
    this.footer = new Footer();
    this.categories = new CategoryWrapper();
    this.game = new Game();
    this.admin = new Admin();
    this.adminHeader = new AdminHeader();

    this.root.before(this.header.element, this.adminHeader.element);
    this.root.after(this.footer.element);
  }

  async start():Promise<void> {
    this.root.append(this.categories.element);
    this.categories.addCategory();
    this.root.append(this.admin.element);
  }

  async render(location: string): Promise<void> {
    switch (location) {
      case '':
      case '#/':
        this.hideAdminPage();
        this.renderSelectedContent(this.categories.element);
        this.categories.addCategory();
        break;
      case '#/admin':
        if (checkAuthorization()) {
          this.renderAdminPage();
          this.admin.addCategories();
          this.adminHeader.activeCategories();
        } else {
          document.location.hash = '#/';
        }
        break;
      default:
        break;
    }

    if (location.includes(SET)) {
      const category = +location.split(SET)[1];
      this.renderSelectedContent(this.game.element, category);
    } else if (location.includes(WORDS)) {
      const category = +location.split(WORDS)[1];
      if (checkAuthorization()) {
        this.renderAdminPage();
        this.admin.addCards(category);
        this.adminHeader.activeCards();
      }
    }
  }

  renderAdminPage():void {
    this.admin.element.innerHTML = '';
    this.header.hideHeader();
    this.adminHeader.showHeader();
    this.renderSelectedContent(this.admin.element);
  }

  hideAdminPage(): void {
    this.header.hideAuthorizationWindow();
    this.header.showHeader();
    this.adminHeader.hideHeader();
  }

  renderSelectedContent(element: HTMLElement, categoryId = 0):void {
    this.root.innerHTML = '';
    this.root.append(element);
    if (categoryId) this.game.addCardToField(categoryId);
    this.game.clearPlaySettings();
  }
}
