import { Label } from '../shared/types';

export class LabelComponent {
  readonly element: HTMLLabelElement;

  constructor(styles: string[] = [], params: Label) {
    this.element = document.createElement('label');
    this.element.classList.add(...styles);
    if (params.inner) this.element.innerHTML = params.inner;
    if (params.for) this.element.htmlFor = params.for;
  }
}
