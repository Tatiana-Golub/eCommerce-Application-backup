import BaseComponent from './base-component';
import { createInput, createLabel, createSpan } from './base-component-factory';
import { InputType } from './input/input-types';
import { Tags } from './tags';

export class Checkbox extends BaseComponent<HTMLDivElement> {
  private readonly input: BaseComponent<HTMLInputElement>;
  private readonly label: BaseComponent<HTMLSpanElement>;

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
    this.label = this.createLabel(checkboxText);

    this.init();
  }

  public isChecked(): boolean {
    return this.input.getElement().checked;
  }

  protected renderComponent(): void {
    this.input.appendTo(this.label.getElement());
    this.label.appendTo(this.getElement());
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

  private createLabel(text: string): BaseComponent<HTMLLabelElement> {
    const label = createLabel(undefined, 'address-checkbox-text');
    label.setText(text);
    return label;
  }
}

export const checkbox = (
  id: string = '',
  className: string = 'checkbox-component',
  onChangedCallback: (() => void) | null,
  checkboxText: string,
): Checkbox => new Checkbox(id, className, onChangedCallback, checkboxText);
