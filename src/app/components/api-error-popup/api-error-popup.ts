import BaseComponent from '@common-components/base-component';
import {
  createButton,
  createH1,
  createH2,
  createSpan,
} from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import './api-error-popup.scss';

class ApiErrorPopupComponent extends BaseComponent<HTMLDivElement> {
  private readonly h2: BaseComponent<HTMLHeadingElement>;
  private readonly span: BaseComponent<HTMLSpanElement>;
  private readonly closeButton: BaseComponent<HTMLButtonElement>;
  private erroMessage: string;

  constructor(
    id: string = 'api-error-popup-component',
    className: string = 'api-error-popup-component',
    erroMessage: string = 'data not found',
  ) {
    super(Tags.DIV, id, className);

    this.erroMessage = erroMessage;
    this.h2 = createH2(undefined, 'heading-2');
    this.span = createSpan(undefined, 'error-message');
    this.closeButton = createButton(undefined, 'close-button');

    this.init();
  }

  public setErrorMessage(erroMessage: string): void {
    this.erroMessage = erroMessage;
  }

  protected renderComponent(): void {
    this.renderHeading2();
    this.renderSpan();
    this.renderCloseButton();
  }

  protected addEventListeners(): void {
    this.addEventListenerCloseButton();
  }

  private renderHeading2(): void {
    this.h2.appendTo(this.getElement());
    this.h2.setText('Api Error');
  }

  private renderSpan(): void {
    this.span.appendTo(this.getElement());
    this.span.setText(this.erroMessage);
  }

  private renderCloseButton(): void {
    this.closeButton.appendTo(this.getElement());
    this.closeButton.setText('Close');
  }

  private addEventListenerCloseButton(): void {
    this.closeButton.addEventListener('click', () => {
      this.remove();
    });
  }
}

export const ApiErrorPopup = (erroMessage: string = 'data not found'): ApiErrorPopupComponent =>
  new ApiErrorPopupComponent(undefined, undefined, erroMessage);
