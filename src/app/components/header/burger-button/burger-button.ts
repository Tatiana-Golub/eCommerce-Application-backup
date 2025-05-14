import BaseComponent from '@common-components/base-component';
import { createSpan } from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import './burger-button.scss';

class BurgerButton extends BaseComponent<HTMLDivElement> {
  private readonly upperLine: BaseComponent<HTMLSpanElement>;
  private readonly bottomLine: BaseComponent<HTMLSpanElement>;

  constructor(id: string = 'burger-button', className: string = 'burger-button') {
    super(Tags.DIV, id, className);
    this.upperLine = createSpan(undefined, 'burger-line');
    this.bottomLine = createSpan(undefined, 'burger-line');

    this.init();
  }

  protected renderComponent(): void {
    this.upperLine.appendTo(this.getElement());
    this.bottomLine.appendTo(this.getElement());
  }

  protected addEventListeners(): void {
    return;
  }
}

export const Burger = (): BurgerButton => new BurgerButton();
