import './authorization-form.sass';
import { BaseComponent } from '../../base-component';
import { ButtonComponent } from '../../button-component';
import { InputComponent } from '../../input-component';
import { Classes } from '../../../shared/types';
import { addToLocalStorage, PASS } from '../../../shared/commonFunction';

export class Authorization extends BaseComponent {
  private readonly window: BaseComponent;

  private readonly titleWrapper: BaseComponent;

  private readonly title: BaseComponent;

  private readonly formWrapper: BaseComponent;

  private readonly loginWrapper: BaseComponent;

  private readonly loginLabel: BaseComponent;

  private readonly loginInput: InputComponent;

  private readonly passwordWrapper: BaseComponent;

  private readonly passwordLabel: BaseComponent;

  private readonly passwordInput: InputComponent;

  private readonly info: BaseComponent;

  private readonly buttons: BaseComponent;

  private readonly cancel: ButtonComponent;

  private readonly login: ButtonComponent;

  constructor() {
    super('div', ['authorization', 'hidden']);
    this.window = new BaseComponent('div', ['authorization__window']);
    this.titleWrapper = new BaseComponent('div', ['authorization__title-wrapper']);
    this.title = new BaseComponent('h3', ['authorization__title'], { inner: 'Login' });
    this.formWrapper = new BaseComponent('div', ['authorization-form']);
    this.loginWrapper = new BaseComponent('div', ['form', 'form__login']);
    this.loginLabel = new BaseComponent('label', ['form__label'], { inner: 'login' });
    this.loginInput = new InputComponent(['form__input'], { type: 'text', placeholder: 'login', required: true });
    this.passwordWrapper = new BaseComponent('div', ['form', 'form__password']);
    this.passwordLabel = new BaseComponent('label', ['form__label'], { inner: 'password' });
    this.passwordInput = new InputComponent(['form__input'],
      { type: 'text', placeholder: 'password', required: true });
    this.info = new BaseComponent('div', ['form__info'], { inner: '*login: admin password: admin' });
    this.buttons = new BaseComponent('div', ['authorization__buttons']);
    this.cancel = new ButtonComponent(['authorization__button', 'authorization__button_cancel'], { name: 'cancel' });
    this.login = new ButtonComponent(['authorization__button', 'authorization__button_login'], { name: 'login' });

    this.element.addEventListener('click', (event) => this.closeWindow(event));
    this.cancel.element.addEventListener('click', () => this.cancelAuthorization());
    this.login.element.addEventListener('click', () => this.authorization());

    this.titleWrapper.element.append(this.title.element);
    this.loginWrapper.element.append(this.loginLabel.element, this.loginInput.element);
    this.passwordWrapper.element.append(this.passwordLabel.element, this.passwordInput.element);
    this.formWrapper.element.append(this.loginWrapper.element, this.passwordWrapper.element, this.info.element);
    this.buttons.element.append(this.cancel.element, this.login.element);
    this.window.element.append(this.titleWrapper.element, this.formWrapper.element, this.buttons.element);
    this.element.append(this.window.element);
  }

  showWindow():void {
    this.element.classList.remove(Classes.hidden);
  }

  hideWindow():void {
    this.element.classList.add(Classes.hidden);
  }

  cleanInputs():void {
    this.loginInput.element.value = '';
    this.passwordInput.element.value = '';
  }

  closeWindow(event: Event):void {
    const target = event.target as HTMLElement;
    if (!target.closest(Classes.auth)) this.hideWindow();
  }

  cancelAuthorization():void {
    this.cleanInputs();
    this.hideWindow();
  }

  authorization():void {
    if (this.loginInput.element.value === PASS && this.passwordInput.element.value === PASS) {
      addToLocalStorage(true);
      document.location.hash = '#/admin';
    } else {
      addToLocalStorage(false);
      this.loginInput.element.value = '';
      this.passwordInput.element.value = '';
    }
    this.loginInput.element.value = '';
    this.passwordInput.element.value = '';
  }
}
