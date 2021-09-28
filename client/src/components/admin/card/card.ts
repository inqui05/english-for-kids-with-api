import { defaultImage, getInputValue, getSoundName } from '../../../shared/commonFunction';
import { fetchData } from '../../../shared/redux';
import { createCard, deleteCard, updateCard } from '../../../shared/requests';
import { Classes, CardData } from '../../../shared/types';
import { AudioComponent } from '../../audio-component';
import { BaseComponent } from '../../base-component';
import { ButtonComponent } from '../../button-component';
import { ImageComponent } from '../../image-component';
import { InputComponent } from '../../input-component';
import { LabelComponent } from '../../label-component';
import './card.sass';

export class AdminCard extends BaseComponent {
  private readonly viewSide: BaseComponent;

  private readonly changesSide: BaseComponent;

  private readonly delete: BaseComponent;

  private readonly wordTitle: BaseComponent;

  private readonly word: BaseComponent;

  private readonly translationTitle: BaseComponent;

  private readonly translation: BaseComponent;

  private readonly soundTitle: BaseComponent;

  private readonly soundName: BaseComponent;

  private readonly sound: AudioComponent;

  private readonly imageTitle: BaseComponent;

  private readonly image: ImageComponent;

  private readonly buttonChange: ButtonComponent;

  private readonly wordForm: BaseComponent;

  private readonly wordLabel: LabelComponent;

  private readonly wordInput: InputComponent;

  private readonly translationForm: BaseComponent;

  private readonly translationLabel: LabelComponent;

  private readonly translationInput: InputComponent;

  private readonly soundContainer: BaseComponent;

  private readonly soundInfo: BaseComponent;

  private readonly soundForm: BaseComponent;

  private readonly soundLabel: LabelComponent;

  private readonly soundInput: InputComponent;

  private readonly imageContainer: BaseComponent;

  private readonly imageInfo: BaseComponent;

  private readonly imageForm: BaseComponent;

  private readonly imageLabel: LabelComponent;

  private readonly imageInput: InputComponent;

  private readonly buttons: BaseComponent;

  private readonly buttonCancel: ButtonComponent;

  private readonly buttonCreate: ButtonComponent;

  private id: number;

  private categoryID: number;

  constructor(params: CardData) {
    super('div', ['admin-card']);
    this.viewSide = new BaseComponent('div', ['admin-card__view']);
    this.changesSide = new BaseComponent('div', ['admin-card__change', Classes.hidden]);
    this.delete = new BaseComponent('div', ['admin-category__close']);
    this.wordTitle = new BaseComponent('p', ['admin-card__info'], { inner: 'Word:&nbsp;' });
    this.word = new BaseComponent('span', ['admin-card__word'], { inner: params.word });
    this.translationTitle = new BaseComponent('p', ['admin-card__info'], { inner: 'Translation:&nbsp;' });
    this.translation = new BaseComponent('span', ['admin-card__translatation'], { inner: params.translation });
    this.soundTitle = new BaseComponent('p', ['admin-card__info'], { inner: 'Sound file:&nbsp;' });
    if (params.id > 16) {
      this.soundName = new BaseComponent('div', ['admin-card__sound'], { inner: getSoundName(params.audioSrc) });
    }
    this.soundName = new BaseComponent('div', ['admin-card__sound'], { inner: getSoundName(params.audioSrc) });
    this.sound = new AudioComponent(params.audioSrc);
    this.imageTitle = new BaseComponent('p', ['admin-card__info'], { inner: 'Image:' });
    this.image = new ImageComponent(['admin-card__image'], { alt: 'Card\'s image', src: params.image });
    this.buttonChange = new ButtonComponent(['admin-card__button-change'], { name: 'Change', disabled: false });
    this.wordForm = new BaseComponent('div', ['admin-card__form']);
    this.wordLabel = new LabelComponent(['admin-card__label'], { inner: 'Word:', for: `word${params.id}` });
    this.wordInput = new InputComponent(['admin-card__input'], {
      type: 'text', value: params.word, id: `word${params.id}`, required: true,
    });
    this.translationForm = new BaseComponent('div', ['admin-card__form']);
    this.translationLabel = new LabelComponent(['admin-card__label'],
      { inner: 'Translation:', for: `translation${params.id}` });
    this.translationInput = new InputComponent(['admin-card__input'], {
      type: 'text', value: params.translation, id: `translation${params.id}`, required: true,
    });
    this.soundContainer = new BaseComponent('div', ['admin-card__input-container']);
    this.soundInfo = new BaseComponent('p', ['admin-card__info'], { inner: 'Sound:' });
    this.soundForm = new BaseComponent('div', ['admin-card__input-wrapper']);
    this.soundLabel = new LabelComponent(['admin-card__input-file-label'],
      { inner: 'Select File', for: `sound${params.id}` });
    this.soundInput = new InputComponent(['admin-card__input-file'],
      { type: 'file', id: `sound${params.id}`, required: true });
    this.imageContainer = new BaseComponent('div', ['admin-card__input-container']);
    this.imageInfo = new BaseComponent('p', ['admin-card__info'], { inner: 'Image:' });
    this.imageForm = new BaseComponent('div', ['admin-card__input-wrapper']);
    this.imageLabel = new LabelComponent(['admin-card__input-file-label'],
      { inner: 'Select File', for: `image${params.id}` });
    this.imageInput = new InputComponent(['admin-card__input-file'], { type: 'file', id: `image${params.id}` });
    this.buttons = new BaseComponent('div', ['admin-card__buttons']);
    this.buttonCancel = new ButtonComponent(['admin-card__cancel', 'admin-card__button'],
      { name: 'Cancel', disabled: false });
    this.buttonCreate = new ButtonComponent(['admin-card__create', 'admin-card__button', 'disabled'],
      { name: 'Create', disabled: true });
    this.id = params.id;
    this.categoryID = params.categoryId;

    this.soundName.element.addEventListener('click', () => this.playSound());
    this.buttonCancel.element.addEventListener('click', () => this.cancelChange());
    this.soundInput.element.addEventListener('input', () => this.getSoundName());
    this.imageInput.element.addEventListener('input', () => this.getImageName());
    this.element.addEventListener('input', () => this.checkInputs());
    this.buttonCreate.element.addEventListener('click', () => this.applyChanges());
    this.delete.element.addEventListener('click', () => this.deleteThisCard());
    this.buttonChange.element.addEventListener('click', () => this.showChangesSide());

    this.wordTitle.element.append(this.word.element);
    this.translationTitle.element.append(this.translation.element);
    this.soundName.element.append(this.sound.element);
    this.soundTitle.element.append(this.soundName.element);
    this.viewSide.element.append(this.delete.element, this.wordTitle.element, this.translationTitle.element,
      this.soundTitle.element, this.imageTitle.element, this.image.element, this.buttonChange.element);
    this.wordForm.element.append(this.wordLabel.element, this.wordInput.element);
    this.translationForm.element.append(this.translationLabel.element, this.translationInput.element);
    this.soundForm.element.append(this.soundLabel.element, this.soundInput.element);
    this.soundContainer.element.append(this.soundInfo.element, this.soundForm.element);
    this.imageForm.element.append(this.imageLabel.element, this.imageInput.element);
    this.imageContainer.element.append(this.imageInfo.element, this.imageForm.element);
    this.buttons.element.append(this.buttonCancel.element, this.buttonCreate.element);
    this.changesSide.element.append(this.wordForm.element, this.translationForm.element, this.soundContainer.element,
      this.imageContainer.element, this.buttons.element);
    this.element.append(this.viewSide.element, this.changesSide.element);
  }

  showViewSide(): void {
    this.viewSide.element.classList.remove(Classes.hidden);
    this.changesSide.element.classList.add(Classes.hidden);
  }

  showChangesSide(): void {
    this.viewSide.element.classList.add(Classes.hidden);
    this.changesSide.element.classList.remove(Classes.hidden);
  }

  playSound(): void {
    this.sound.element.play();
  }

  remove(): void {
    this.element.remove();
  }

  private cancelChange(): void {
    if (this.id === 0) {
      this.element.remove();
    } else {
      this.showViewSide();
    }
  }

  private getSoundName(): void {
    if (this.soundInput.element.files) {
      const file = this.soundInput.element.files[0];
      this.soundLabel.element.innerHTML = file.name;
      this.soundLabel.element.classList.add('admin-card__input-file-label_left');
    }
  }

  private getImageName(): void {
    if (this.imageInput.element.files) {
      const file = this.imageInput.element.files[0];
      this.imageLabel.element.innerHTML = file.name;
      this.imageLabel.element.classList.add('admin-card__input-file-label_left');
    }
  }

  private checkInputs() {
    this.wordInput.element.value = this.wordInput.element.value.replace(/[^a-z]/ig, '');
    this.translationInput.element.value = this.translationInput.element.value.replace(/[^а-я]/ig, '');

    if (this.wordInput.element.value.length > 2 && this.translationInput.element.value.length > 2
      && this.soundInput.element.files) {
      this.buttonCreate.element.disabled = false;
      this.buttonCreate.element.classList.remove(Classes.disabled);
    } else {
      this.buttonCreate.element.disabled = true;
      this.buttonCreate.element.classList.add(Classes.disabled);
    }
  }

  private async deleteThisCard():Promise<void> {
    const result = await deleteCard(this.id);
    if (result.status) {
      this.element.remove();
      fetchData();
    }
  }

  private applyChanges(): void {
    if (this.id === 0) {
      this.addCard();
    } else {
      this.changeCard();
    }
  }

  private async getInfoFromInputs(): Promise<CardData> {
    const word = this.wordInput.element.value;
    const translation = this.translationInput.element.value;

    const audio = await getInputValue(this.soundInput.element);
    let audioSrc = '';
    if (audio === '' && this.sound.element.src !== '') {
      audioSrc = this.sound.element.src;
    } else if (audio !== '') {
      audioSrc = audio;
    }

    const imageData = await getInputValue(this.imageInput.element);
    let image;
    if (imageData === '' && this.image.element.src === '') {
      image = defaultImage;
    } else if (imageData === '' && this.image.element.src !== '') {
      image = this.image.element.src;
    } else {
      image = imageData;
    }

    return {
      id: this.id, categoryId: this.categoryID, word, translation, audioSrc, image,
    } as CardData;
  }

  private async addCard() {
    const cardInfo = await this.getInfoFromInputs();
    const result = await createCard(cardInfo);
    this.id = result.id;
    this.addDataToCard(result);
    this.changeIDData(this.id);

    fetchData();
  }

  private async changeCard() {
    const cardInfo = await this.getInfoFromInputs();
    const result = await updateCard(this.id, cardInfo);
    this.addDataToCard(result);

    fetchData();
  }

  private addDataToCard(data: CardData): void {
    this.word.element.innerHTML = data.word;
    this.translation.element.innerHTML = data.translation;
    this.soundName.element.innerHTML = data.audioSrc;
    this.sound.element.src = data.audioSrc;
    this.image.element.src = data.image;

    this.showViewSide();
  }

  private changeIDData(id: number): void {
    this.soundLabel.element.htmlFor = `sound${id}`;
    this.soundInput.element.id = `sound${id}`;
    this.imageLabel.element.htmlFor = `image${id}`;
    this.imageInput.element.id = `image${id}`;
    this.wordLabel.element.htmlFor = `word${id}`;
    this.translationLabel.element.htmlFor = `word${id}`;
  }
}
