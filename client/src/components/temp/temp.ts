import { Classes } from '../../shared/types';
import { BaseComponent } from '../base-component';
import { ButtonComponent } from '../button-component';
import './temp.sass';

const text = `Добрый день! За последедлайновый период я намучался сначала с cors, потом с ассинхронным thunk redux js, 
  а в воскресенье замучался с деплоем сервера на heroku. Сейчас приложение не полностью завязано с api (пока не
  дошли руки до карточек в админке, категории уже корректно работают. Дедлайн кросс-чека перенесли на 22 число.   
  19 я прохожу интервью по JS Core и 20 доделаю свою работу. Если можете - потерпите еще чуть-чуть. Но даже если 
  обстоятельства не позволяют подождать, СПАСИБО что дали мне возможность закончить часть работы!`;

export class TemperaryWindow extends BaseComponent {
  private readonly window: BaseComponent;

  private readonly title: BaseComponent;

  private readonly ok: ButtonComponent;

  constructor() {
    super('div', ['please']);
    this.window = new BaseComponent('div', ['please__window']);
    this.title = new BaseComponent('div', ['please__title'], { inner: text });
    this.ok = new ButtonComponent(['please__close'], { name: 'OK' });

    this.ok.element.addEventListener('click', () => this.closeWindow());

    this.window.element.append(this.title.element, this.ok.element);
    this.element.append(this.window.element);
  }

  closeWindow():void {
    this.element.classList.add(Classes.hidden);
  }
}
