import BaseComponent from '@common-components/base-component';
import { createButton, createDiv, createP } from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import './api-popup.scss';

class ApiPopupComponent extends BaseComponent<HTMLDialogElement> {
  private readonly container: BaseComponent<HTMLDivElement>;
  private readonly message: BaseComponent<HTMLParagraphElement>;
  private readonly closeButton: BaseComponent<HTMLButtonElement>;
  private erroMessage: string;
  private onCloseCallback?: () => void;

  constructor(
    id: string = 'api-error-popup-component',
    className: string = 'api-error-popup-component',
    erroMessage: string = 'data not found',
  ) {
    super(Tags.DIALOG, id, className);

    this.erroMessage = erroMessage;
    this.container = createDiv('', 'container');
    this.message = createP(undefined, 'message');
    this.closeButton = createButton(undefined, 'close-button');

    this.init();
  }

  public setErrorMessage(erroMessage: string): void {
    this.erroMessage = erroMessage;
    this.message.setText(this.erroMessage);
  }

  public show(): void {
    this.getElement().showModal();
  }

  public onClose(callback: () => void): void {
    this.onCloseCallback = callback;
  }

  protected renderComponent(): void {
    this.renderContainer();
    this.renderMessage();
    this.renderCloseButton();
  }

  protected addEventListeners(): void {
    this.addEventListenerCloseButton();
    this.addEventListenerCloseOnBackdrop();
    this.addEventListenerCloseOnEscape();
  }

  private close(): void {
    this.getElement().close();
    this.remove();
    if (this.onCloseCallback) {
      this.onCloseCallback();
    }
  }

  private renderContainer(): void {
    this.container.appendTo(this.getElement());
  }

  private renderMessage(): void {
    this.message.appendTo(this.container.getElement());
    this.setErrorMessage(this.erroMessage);
  }

  private renderCloseButton(): void {
    this.closeButton.appendTo(this.container.getElement());
    this.closeButton.setText('Close');
  }

  private addEventListenerCloseButton(): void {
    this.closeButton.addEventListener('click', () => {
      this.close();
    });
  }

  private addEventListenerCloseOnBackdrop(): void {
    this.getElement().addEventListener('click', (event) => {
      if (event.target === this.getElement()) {
        this.close();
      }
    });
  }

  private addEventListenerCloseOnEscape(): void {
    this.getElement().addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    });
  }
}

export const ApiPopup = (erroMessage: string = 'data not found'): ApiPopupComponent =>
  new ApiPopupComponent(undefined, undefined, erroMessage);
