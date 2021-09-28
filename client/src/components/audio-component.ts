import { Audio } from '../shared/types';

export class AudioComponent {
  readonly element: HTMLAudioElement;

  constructor(audioFile: string, params: Audio = {}) {
    this.element = new Audio(audioFile);
    if (params.inner) this.element.innerHTML = params.inner;
  }
}
