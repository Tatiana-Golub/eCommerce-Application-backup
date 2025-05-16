import type BaseComponent from '../base-component';
import { InputType } from './input-types';
import type { LabelParameters } from './validating-input-component';
import { BaseValidatingInputComponent } from './validating-input-component';

export class DateValidatingInput extends BaseValidatingInputComponent {
  constructor(
    id: string = 'date-input',
    className: string = 'date-input',
    onInputChangedCallback: (() => void) | null,
    labelParameters: LabelParameters | undefined,
  ) {
    super(id, className, onInputChangedCallback, labelParameters);

    this.init();
  }

  protected getValidationRulePairs(): Map<RegExp, string> {
    return new Map<RegExp, string>();
    // A valid date input ensuring the user is above a certain age (e.g., 13 years old or older)
  }

  protected createInput(): BaseComponent<HTMLInputElement> {
    return super.createInput(undefined, 'date', InputType.DATE, '');
  }
}

export const dateValidatingInput = (
  onInputChangedCallback: (() => void) | null = null,
  labelParameters: LabelParameters | undefined = undefined,
): DateValidatingInput =>
  new DateValidatingInput('date-input', 'date-input', onInputChangedCallback, labelParameters);
