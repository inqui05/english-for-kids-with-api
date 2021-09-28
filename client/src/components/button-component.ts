import { Button } from '../shared/types';

export class ButtonComponent {
  readonly element: HTMLButtonElement;

  constructor(styles: string[] = [], params: Button) {
    this.element = document.createElement('button');
    this.element.classList.add(...styles);
    if (params.name) this.element.innerHTML = params.name;
    if (params.disabled) this.element.disabled = params.disabled;
  }
}
