import BaseComponent from '../base-component';
import { createDiv, createInput, createSpan } from '../base-component-factory';
import { Tags } from '../tags';
import { InputType } from './input-types';

const Classes = {
  HIDDEN: 'hidden',
};

export abstract class BaseValidatingInputComponent extends BaseComponent<HTMLDivElement> {
  protected input: BaseComponent<HTMLInputElement>;
  private tooltip: BaseComponent<HTMLDivElement>;
  private validationPair: Map<RegExp, BaseComponent<HTMLSpanElement>> = new Map();

  constructor(
    id: string = 'validating-input-component',
    className: string = 'validating-input-component',
  ) {
    super(Tags.DIV, id, className);

    this.input = this.createInput();
    this.tooltip = this.createTooltip();
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
    this.input.addEventListener('input', () => this.validate());
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

  private createInput(): BaseComponent<HTMLInputElement> {
    const emailInput = createInput(undefined, 'email');
    const emailInputElement = emailInput.getElement();
    emailInputElement.placeholder = 'Enter your e-mail';
    emailInputElement.type = InputType.TEXT;

    return emailInput;
  }

  private createTooltip(): BaseComponent<HTMLDivElement> {
    const emailTooltip = createDiv(undefined, 'tooltip');
    emailTooltip.addClass(Classes.HIDDEN);

    return emailTooltip;
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
