import BaseComponent from './base-component';
import { createInput, createSpan } from './base-component-factory';
import { InputType } from './input/input-types';
import { Tags } from './tags';

export class Checkbox extends BaseComponent<HTMLDivElement> {
  private readonly input: BaseComponent<HTMLInputElement>;
  private readonly span: BaseComponent<HTMLSpanElement>;

  private readonly onChangedCallback: (() => void) | null;

  constructor(
    id: string = '',
    className: string = 'checkbox-component',
    onChangedCallback: (() => void) | null,
    checkboxText: string,
  ) {
    super(Tags.DIV, id, className);

    this.onChangedCallback = onChangedCallback;

    this.input = this.createInput();
    this.span = this.createSpan(checkboxText);

    this.init();
  }

  protected renderComponent(): void {
    this.input.appendTo(this.getElement());
    this.span.appendTo(this.getElement());
  }

  protected addEventListeners(): void {
    this.input.addEventListener('change', () => {
      this.onChangedCallback?.();
    });
  }

  private createInput(): BaseComponent<HTMLInputElement> {
    const input = createInput(undefined, 'address-checkbox-input');
    input.getElement().type = InputType.CHECKBOX;

    return input;
  }

  private createSpan(text: string): BaseComponent<HTMLSpanElement> {
    const span = createSpan(undefined, 'address-checkbox-text');
    span.setText(text);

    return span;
  }
}

export const checkbox = (
  id: string = '',
  className: string = 'checkbox-component',
  onChangedCallback: (() => void) | null,
  checkboxText: string,
): Checkbox => new Checkbox(id, className, onChangedCallback, checkboxText);
