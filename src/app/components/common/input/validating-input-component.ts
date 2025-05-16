import BaseComponent from '../base-component';
import { createDiv, createInput, createSpan } from '../base-component-factory';
import { Tags } from '../tags';
import { InputType } from './input-types';

const Classes = {
  HIDDEN: 'hidden',
};

export abstract class BaseValidatingInputComponent extends BaseComponent<HTMLDivElement> {
  protected readonly input: BaseComponent<HTMLInputElement>;
  private readonly tooltip: BaseComponent<HTMLDivElement>;
  private readonly validationPair: Map<RegExp, BaseComponent<HTMLSpanElement>> = new Map();
  private readonly onInputChangedCallback: (() => void) | null;

  constructor(
    id: string = '',
    className: string = 'validating-input-component',
    onInputChangedCalback: (() => void) | null,
  ) {
    super(Tags.DIV, id, className);

    this.input = this.createInput();
    this.tooltip = this.createTooltip();
    this.onInputChangedCallback = onInputChangedCalback;
    this.createErrorMessages();
  }

  public getInputValue(): string {
    return this.input.getElement().value || '';
  }

  public isValid(): boolean {
    const inputValue = this.getInputValue();
    for (const regExp of this.validationPair.keys()) {
      if (!regExp.test(inputValue)) return false;
    }

    return true;
  }

  protected renderComponent(): void {
    this.input.appendTo(this.getElement());
    this.afterRenderInput();
    this.tooltip.appendTo(this.getElement());
    this.renderErrorMessages();
  }

  protected addEventListeners(): void {
    this.input.addEventListener('input', () => {
      this.validate();
      this.onInputChangedCallback?.();
    });
  }

  protected validate(): boolean {
    const inputValue = this.getInputValue();
    let isValid = true;

    for (const [regExp, span] of this.validationPair) {
      const isRuleValid = regExp.test(inputValue);
      if (!isRuleValid) isValid = false;
      this.renderValidationErrorForRule(span, isRuleValid);
    }

    this.renderValidationErrorForRule(this.tooltip, isValid || inputValue === '');
    return isValid;
  }

  protected afterRenderInput(): void {}

  protected createInput(
    id: string = '',
    className: string = '',
    type: InputType = InputType.TEXT,
    placeholder: string = '',
  ): BaseComponent<HTMLInputElement> {
    const input = createInput(id, className);
    const inputElement = input.getElement();
    inputElement.placeholder = placeholder;
    inputElement.type = type;

    return input;
  }

  private createTooltip(): BaseComponent<HTMLDivElement> {
    const tooltip = createDiv(undefined, 'tooltip');
    tooltip.addClass(Classes.HIDDEN);

    return tooltip;
  }

  private createErrorMessages(): void {
    for (const [key, value] of this.getValidationRulePairs()) {
      const span = createSpan(undefined, 'error-message');
      span.setText(value);

      this.validationPair.set(key, span);
    }
  }

  private renderErrorMessages(): void {
    for (const span of this.validationPair.values()) {
      span.appendTo(this.tooltip.getElement());
    }
  }

  private renderValidationErrorForRule(
    component: BaseComponent<HTMLSpanElement>,
    isValidFlag: boolean,
  ): void {
    if (isValidFlag) {
      component.addClass(Classes.HIDDEN);
    } else {
      component.removeClass(Classes.HIDDEN);
    }
  }

  protected abstract getValidationRulePairs(): Map<RegExp, string>;
}
