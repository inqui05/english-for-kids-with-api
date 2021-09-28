import { Input } from '../shared/types';

export class InputComponent {
  readonly element: HTMLInputElement;

  constructor(styles: string[] = [], params: Input = { type: 'text' }) {
    this.element = document.createElement('input');
    this.element.classList.add(...styles);
    this.element.type = params.type;
    if (params.placeholder) this.element.placeholder = params.placeholder;
    if (params.required) this.element.required = params.required;
    if (params.value) this.element.value = params.value;
    if (params.id) this.element.id = params.id;
  }
}
