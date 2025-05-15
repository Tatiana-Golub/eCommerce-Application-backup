import { BaseValidatingInputComponent } from './validating-input-component';
import { emailRules } from '@/app/utils/validation-constants';

class EmailValidatingInput extends BaseValidatingInputComponent {
  constructor(
    id: string = 'email-input',
    className: string = 'email-input',
    onInputChangedCallback: (() => void) | null,
  ) {
    super(id, className, onInputChangedCallback);

    this.init();
  }

  protected getValidationRulePairs(): Map<RegExp, string> {
    return new Map<RegExp, string>([
      [emailRules.format, 'Email must be properly formatted (e.g., user@example.com)'],
      [emailRules.noWhitespace, 'Email must not contain leading or trailing whitespace'],
      [emailRules.hasAt, 'Email must contain an "@" symbol'],
      [emailRules.hasDomain, 'Email must include a domain (e.g., example.com)'],
    ]);
  }
}

export const emailValidatingInput = (
  onInputChangedCallback: (() => void) | null = null,
): EmailValidatingInput =>
  new EmailValidatingInput('email-input', 'email-input', onInputChangedCallback);
