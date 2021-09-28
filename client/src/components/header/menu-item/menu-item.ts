import './menu-item.sass';
import { AnchorComponent } from '../../anchor-component';
import { BaseComponent } from '../../base-component';
import { Anchor } from '../../../shared/types';

export class MenuItem extends BaseComponent {
  private readonly link: AnchorComponent;

  constructor(params: Anchor) {
    super('li', ['menu__item']);
    this.link = new AnchorComponent(['menu__link'], params);

    this.element.append(this.link.element);
  }

  removeHighlight():void {
    this.link.element.classList.remove('menu__link_active');
  }

  removeElement(): void {
    this.element.remove();
  }
}
