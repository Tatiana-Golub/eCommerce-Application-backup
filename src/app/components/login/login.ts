import BaseComponent from '@common-components/base-component';
import {
  createButton,
  createDiv,
  createForm,
  createInput,
  createSpan,
} from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import './login.scss';
import { InputType } from '../common/input-types';
import { eyeClose, eyeOpen } from '@/app/utils/svg-constants';
import { emailRules, passwordRules } from '@/app/utils/validation-constants';

class LoginComponent extends BaseComponent<HTMLDivElement> {
  private readonly form: BaseComponent<HTMLFormElement>;

  private readonly emailInputDiv: BaseComponent<HTMLDivElement>;
  private emailInput: BaseComponent<HTMLInputElement> | undefined;
  private emailTooltip: BaseComponent<HTMLDivElement> | undefined;
  private emailFormat: BaseComponent<HTMLSpanElement> | undefined;
  private emailWhitespace: BaseComponent<HTMLSpanElement> | undefined;
  private emailAt: BaseComponent<HTMLSpanElement> | undefined;
  private emailDomain: BaseComponent<HTMLSpanElement> | undefined;

  private readonly passwordInputDiv: BaseComponent<HTMLDivElement>;
  private isPasswordVisible: boolean = false;
  private passwordInput: BaseComponent<HTMLInputElement> | undefined;
  private passwordControl: BaseComponent<HTMLDivElement> | undefined;
  private passwordTooltip: BaseComponent<HTMLDivElement> | undefined;
  private passwordLength: BaseComponent<HTMLSpanElement> | undefined;
  private passwordUppercase: BaseComponent<HTMLSpanElement> | undefined;
  private passwordLowercase: BaseComponent<HTMLSpanElement> | undefined;
  private passwordDigit: BaseComponent<HTMLSpanElement> | undefined;
  private passwordSpecial: BaseComponent<HTMLSpanElement> | undefined;
  private passwordWhitespace: BaseComponent<HTMLSpanElement> | undefined;

  private readonly submitButton: BaseComponent<HTMLButtonElement>;

  constructor(id: string = 'login-component', className: string = 'container') {
    super(Tags.DIV, id, className);

    this.form = createForm(undefined, 'login-form');

    this.emailInputDiv = this.createEmailInputDiv();
    this.emailInputDiv.appendTo(this.form.getElement());

    this.passwordInputDiv = this.createPasswordInputDiv();
    this.passwordInputDiv.appendTo(this.form.getElement());

    this.submitButton = createButton(undefined, 'button');
    this.submitButton.setText('Sign In');
    this.submitButton.appendTo(this.form.getElement());

    this.init();
  }

  protected renderComponent(): void {
    this.renderForm();
  }

  protected addEventListeners(): void {
    this.addEventListenerPasswordControl();
    this.emailInput?.addEventListener('input', () => this.validateEmail());
    this.passwordInput?.addEventListener('input', () => this.validatePassword());
    this.submitButton?.addEventListener('click', () => this.onSubmit());
  }

  private onSubmit(): void {
    console.log('Submit button clicked');
  }

  private validateEmail(): void {
    const email = this.emailInput?.getElement().value || '';

    const isValidFormat = emailRules.format.test(email);
    const isValidWhitespace = emailRules.noWhitespace.test(email);
    const hasAt = emailRules.hasAt.test(email);
    const hasDomain = emailRules.hasDomain.test(email);

    if (this.emailFormat)
      this.emailFormat.getElement().style.display = isValidFormat ? 'none' : 'block';
    if (this.emailWhitespace)
      this.emailWhitespace.getElement().style.display = isValidWhitespace ? 'none' : 'block';
    if (this.emailAt) this.emailAt.getElement().style.display = hasAt ? 'none' : 'block';
    if (this.emailDomain)
      this.emailDomain.getElement().style.display = hasDomain ? 'none' : 'block';

    const isValid = isValidFormat && isValidWhitespace && hasAt && hasDomain;
    if (this.emailTooltip) this.emailTooltip.getElement().hidden = isValid || email === '';
  }

  private validatePassword(): void {
    const password = this.passwordInput?.getElement().value || '';

    const isValidLength = passwordRules.minLength.test(password);
    const isValidUpperCase = passwordRules.upperCase.test(password);
    const isValidLowerCase = passwordRules.lowerCase.test(password);
    const isValidDigit = passwordRules.digit.test(password);
    const isValidSpecialChar = passwordRules.specialChar.test(password);
    const isValidWhitespace = passwordRules.noWhitespace.test(password);

    if (this.passwordLength)
      this.passwordLength.getElement().style.display = isValidLength ? 'none' : 'block';
    if (this.passwordUppercase)
      this.passwordUppercase.getElement().style.display = isValidUpperCase ? 'none' : 'block';
    if (this.passwordLowercase)
      this.passwordLowercase.getElement().style.display = isValidLowerCase ? 'none' : 'block';
    if (this.passwordDigit)
      this.passwordDigit.getElement().style.display = isValidDigit ? 'none' : 'block';
    if (this.passwordSpecial)
      this.passwordSpecial.getElement().style.display = isValidSpecialChar ? 'none' : 'block';
    if (this.passwordWhitespace)
      this.passwordWhitespace.getElement().style.display = isValidWhitespace ? 'none' : 'block';

    const isValid =
      isValidLength &&
      isValidUpperCase &&
      isValidLowerCase &&
      isValidDigit &&
      isValidWhitespace &&
      isValidSpecialChar;
    if (this.passwordTooltip) this.passwordTooltip.getElement().hidden = isValid || password === '';
  }

  private addEventListenerPasswordControl(): void {
    this.passwordControl?.addEventListener('click', () => {
      this.isPasswordVisible = !this.isPasswordVisible;
      if (this.passwordInput)
        this.passwordInput.getElement().type = this.isPasswordVisible
          ? InputType.TEXT
          : InputType.PASSWORD;
      this.passwordControl?.removeChildren();
      this.passwordControl
        ?.getElement()
        .insertAdjacentHTML('afterbegin', this.isPasswordVisible ? eyeOpen : eyeClose);
    });
  }

  private renderForm(): void {
    this.form.appendTo(this.getElement());
  }

  private createEmailInputDiv(): BaseComponent<HTMLDivElement> {
    const emailInputDiv = createDiv(undefined, 'email-input');

    this.emailInput = createInput(undefined, 'email');
    const emailInputElement = this.emailInput.getElement();
    emailInputElement.placeholder = 'Enter your e-mail';
    emailInputElement.type = InputType.TEXT;
    this.emailInput.appendTo(emailInputDiv.getElement());

    this.emailTooltip = createDiv(undefined, 'tooltip');
    this.emailTooltip.getElement().hidden = true;
    this.emailTooltip.appendTo(emailInputDiv.getElement());

    this.emailFormat = createSpan(undefined, 'error-message');
    this.emailFormat.setText('Email must be properly formatted (e.g., user@example.com)');
    this.emailFormat.appendTo(this.emailTooltip.getElement());

    this.emailWhitespace = createSpan(undefined, 'error-message');
    this.emailWhitespace.setText('Email must not contain leading or trailing whitespace');
    this.emailWhitespace.appendTo(this.emailTooltip.getElement());

    this.emailAt = createSpan(undefined, 'error-message');
    this.emailAt.setText('Email must contain an "@" symbol');
    this.emailAt.appendTo(this.emailTooltip.getElement());

    this.emailDomain = createSpan(undefined, 'error-message');
    this.emailDomain.setText('Email must include a domain (e.g., example.com)');
    this.emailDomain.appendTo(this.emailTooltip.getElement());

    return emailInputDiv;
  }

  private createPasswordInputDiv(): BaseComponent<HTMLDivElement> {
    const passwordInputDiv = createDiv(undefined, 'password-input');

    this.passwordInput = createInput(undefined, 'password');
    const passwordInputElement = this.passwordInput.getElement();
    passwordInputElement.placeholder = 'Enter your password';
    passwordInputElement.type = InputType.PASSWORD;
    this.passwordInput.appendTo(passwordInputDiv.getElement());

    this.passwordControl = createDiv(undefined, 'password-control');
    this.passwordControl.getElement().insertAdjacentHTML('afterbegin', eyeClose);
    this.passwordControl.appendTo(passwordInputDiv.getElement());

    this.passwordTooltip = createDiv(undefined, 'tooltip');
    this.passwordTooltip.getElement().hidden = true;
    this.passwordTooltip.appendTo(passwordInputDiv.getElement());

    this.passwordLength = createSpan(undefined, 'error-message');
    this.passwordLength.setText('Password must be at least 8 characters long');
    this.passwordLength.appendTo(this.passwordTooltip.getElement());

    this.passwordUppercase = createSpan(undefined, 'error-message');
    this.passwordUppercase.setText('Password must contain at least one uppercase letter (A-Z)');
    this.passwordUppercase.appendTo(this.passwordTooltip.getElement());

    this.passwordLowercase = createSpan(undefined, 'error-message');
    this.passwordLowercase.setText('Password must contain at least one lowercase letter (a-z)');
    this.passwordLowercase.appendTo(this.passwordTooltip.getElement());

    this.passwordDigit = createSpan(undefined, 'error-message');
    this.passwordDigit.setText('Password must contain at least one digit (0-9)');
    this.passwordDigit.appendTo(this.passwordTooltip.getElement());

    this.passwordSpecial = createSpan(undefined, 'error-message');
    this.passwordSpecial.setText(
      'Password must contain at least one special character (e.g., !@#$%^&*)',
    );
    this.passwordSpecial.appendTo(this.passwordTooltip.getElement());

    this.passwordWhitespace = createSpan(undefined, 'error-message');
    this.passwordWhitespace.setText('Password must not contain leading or trailing whitespace');
    this.passwordWhitespace.appendTo(this.passwordTooltip.getElement());

    return passwordInputDiv;
  }
}

export const Login = (): LoginComponent => new LoginComponent();
