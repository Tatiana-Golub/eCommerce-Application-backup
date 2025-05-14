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
import { InputType } from '../common/input/input-types';
import { router } from '@/app/router';
import { SdkApi } from '@/app/utils/comerce-sdk-api';
import { PublishSubscriber } from '@/app/utils/event-bus/event-bus';
import { eyeClose, eyeOpen } from '@/app/utils/svg-constants';
import { UserCache } from '@/app/utils/token-cache';
import { emailRules, passwordRules } from '@/app/utils/validation-constants';

class LoginComponent extends BaseComponent<HTMLDivElement> {
  private readonly form: BaseComponent<HTMLFormElement>;

  private readonly emailInputDiv: BaseComponent<HTMLDivElement>;
  private readonly emailInput: BaseComponent<HTMLInputElement>;
  private readonly emailTooltip: BaseComponent<HTMLDivElement>;
  private readonly emailFormat: BaseComponent<HTMLSpanElement>;
  private readonly emailWhitespace: BaseComponent<HTMLSpanElement>;
  private readonly emailAt: BaseComponent<HTMLSpanElement>;
  private readonly emailDomain: BaseComponent<HTMLSpanElement>;

  private readonly passwordInputDiv: BaseComponent<HTMLDivElement>;
  private readonly passwordInput: BaseComponent<HTMLInputElement>;
  private readonly passwordControl: BaseComponent<HTMLDivElement>;
  private readonly passwordTooltip: BaseComponent<HTMLDivElement>;
  private readonly passwordLength: BaseComponent<HTMLSpanElement>;
  private readonly passwordUppercase: BaseComponent<HTMLSpanElement>;
  private readonly passwordLowercase: BaseComponent<HTMLSpanElement>;
  private readonly passwordDigit: BaseComponent<HTMLSpanElement>;
  private readonly passwordSpecial: BaseComponent<HTMLSpanElement>;
  private readonly passwordWhitespace: BaseComponent<HTMLSpanElement>;
  private isPasswordVisible: boolean = false;

  private readonly submitButton: BaseComponent<HTMLButtonElement>;

  constructor(id: string = 'login-component', className: string = 'login-component') {
    super(Tags.DIV, id, className);

    this.form = createForm(undefined, 'login-form');

    this.emailInputDiv = this.createEmailInputDiv();
    this.emailInput = this.createEmailInput();
    this.emailTooltip = this.createEmailTooltip();
    this.emailFormat = this.createEmailFormat();
    this.emailWhitespace = this.createEmailWhitespace();
    this.emailAt = this.createEmailAt();
    this.emailDomain = this.createEmailDomain();

    this.passwordInputDiv = this.createPasswordInputDiv();
    this.passwordInput = this.createPasswordInput();
    this.passwordControl = this.createPasswordControl();
    this.passwordTooltip = this.createPasswordTooltip();
    this.passwordLength = this.createPasswordLength();
    this.passwordUppercase = this.createPasswordUppercase();
    this.passwordLowercase = this.createPasswordLowercase();
    this.passwordDigit = this.createPasswordDigit();
    this.passwordSpecial = this.createPasswordSpecial();
    this.passwordWhitespace = this.createPasswordWhitespace();

    this.submitButton = this.createSubmitButton();

    this.init();
  }

  protected renderComponent(): void {
    this.renderForm();
    this.renderEmailInputDiv();
    this.renderPasswordInputDiv();
    this.renderSubmitButton();
  }

  protected addEventListeners(): void {
    this.addEventListenerPasswordControl();
    this.emailInput.addEventListener('input', () => this.updateSubmitButton());
    this.passwordInput.addEventListener('input', () => this.updateSubmitButton());
    this.submitButton.addEventListener('click', () => this.onSubmit());
  }

  private updateSubmitButton(): void {
    const validateEmailResults = this.validateEmail();
    const validatePasswordResults = this.validatePassword();

    if (validateEmailResults && validatePasswordResults) {
      this.submitButton.removeAttribute('disabled');
    } else {
      this.submitButton.setAttribute('disabled', 'true');
    }
  }

  private async onSubmit(): Promise<void> {
    const email = this.emailInput.getElement().value;
    const password = this.passwordInput.getElement().value;

    await SdkApi().loginUser(email, password);
    await SdkApi()
      .withPasswordFlow(email, password)
      .getMe()
      .then((response) => {
        UserCache.set(response.body);
      });

    // Just example
    // TODO: Remove
    PublishSubscriber().publish('userLoggedIn', { userId: email });

    router.navigate('#/main');
  }

  private validateEmail(): boolean {
    const email = this.emailInput.getElement().value || '';

    const isValidFormat = emailRules.format.test(email);
    const isValidWhitespace = emailRules.noWhitespace.test(email);
    const hasAt = emailRules.hasAt.test(email);
    const hasDomain = emailRules.hasDomain.test(email);

    this.renderValidationErrorForRule(this.emailFormat, isValidFormat);
    this.renderValidationErrorForRule(this.emailWhitespace, isValidWhitespace);
    this.renderValidationErrorForRule(this.emailAt, hasAt);
    this.renderValidationErrorForRule(this.emailDomain, hasDomain);

    const isValid = isValidFormat && isValidWhitespace && hasAt && hasDomain;
    this.renderValidationErrorForRule(this.emailTooltip, isValid || email === '');
    return isValid;
  }

  private validatePassword(): boolean {
    const password = this.passwordInput.getElement().value || '';

    const isValidLength = passwordRules.minLength.test(password);
    const isValidUpperCase = passwordRules.upperCase.test(password);
    const isValidLowerCase = passwordRules.lowerCase.test(password);
    const isValidDigit = passwordRules.digit.test(password);
    const isValidSpecialChar = passwordRules.specialChar.test(password);
    const isValidWhitespace = passwordRules.noWhitespace.test(password);

    this.renderValidationErrorForRule(this.passwordLength, isValidLength);
    this.renderValidationErrorForRule(this.passwordUppercase, isValidUpperCase);
    this.renderValidationErrorForRule(this.passwordLowercase, isValidLowerCase);
    this.renderValidationErrorForRule(this.passwordDigit, isValidDigit);
    this.renderValidationErrorForRule(this.passwordSpecial, isValidSpecialChar);
    this.renderValidationErrorForRule(this.passwordWhitespace, isValidWhitespace);

    const isValid =
      isValidLength &&
      isValidUpperCase &&
      isValidLowerCase &&
      isValidDigit &&
      isValidWhitespace &&
      isValidSpecialChar;
    this.renderValidationErrorForRule(this.passwordTooltip, isValid || password === '');
    return isValid;
  }

  private renderValidationErrorForRule(
    component: BaseComponent<HTMLSpanElement>,
    isValidFlagflag: boolean,
  ): void {
    if (isValidFlagflag) {
      component.addClass('hidden');
    } else {
      component.removeClass('hidden');
    }
  }

  private addEventListenerPasswordControl(): void {
    this.passwordControl?.addEventListener('click', () => {
      this.isPasswordVisible = !this.isPasswordVisible;
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

  private renderSubmitButton(): void {
    this.submitButton.appendTo(this.form.getElement());
  }

  private renderPasswordInputDiv(): void {
    this.passwordInputDiv.appendTo(this.form.getElement());
    this.passwordInput.appendTo(this.passwordInputDiv.getElement());
    this.passwordControl.appendTo(this.passwordInputDiv.getElement());
    this.passwordTooltip.appendTo(this.passwordInputDiv.getElement());
    this.passwordLength.appendTo(this.passwordTooltip.getElement());
    this.passwordUppercase.appendTo(this.passwordTooltip.getElement());
    this.passwordLowercase.appendTo(this.passwordTooltip.getElement());
    this.passwordDigit.appendTo(this.passwordTooltip.getElement());
    this.passwordSpecial.appendTo(this.passwordTooltip.getElement());
    this.passwordWhitespace.appendTo(this.passwordTooltip.getElement());
  }

  private renderEmailInputDiv(): void {
    this.emailInputDiv.appendTo(this.form.getElement());
    this.emailInput.appendTo(this.emailInputDiv.getElement());
    this.emailTooltip.appendTo(this.emailInputDiv.getElement());
    this.emailFormat.appendTo(this.emailTooltip.getElement());
    this.emailWhitespace.appendTo(this.emailTooltip.getElement());
    this.emailAt.appendTo(this.emailTooltip.getElement());
    this.emailDomain.appendTo(this.emailTooltip.getElement());
  }

  private createEmailInputDiv(): BaseComponent<HTMLDivElement> {
    return createDiv(undefined, 'email-input');
  }

  private createEmailDomain(): BaseComponent<HTMLSpanElement> {
    const emailDomain = createSpan(undefined, 'error-message');
    emailDomain.setText('Email must include a domain (e.g., example.com)');

    return emailDomain;
  }

  private createEmailAt(): BaseComponent<HTMLSpanElement> {
    const emailAt = createSpan(undefined, 'error-message');
    emailAt.setText('Email must contain an "@" symbol');

    return emailAt;
  }

  private createEmailWhitespace(): BaseComponent<HTMLSpanElement> {
    const emailWhitespace = createSpan(undefined, 'error-message');
    emailWhitespace.setText('Email must not contain leading or trailing whitespace');

    return emailWhitespace;
  }

  private createEmailFormat(): BaseComponent<HTMLSpanElement> {
    const emailFormat = createSpan(undefined, 'error-message');
    emailFormat.setText('Email must be properly formatted (e.g., user@example.com)');

    return emailFormat;
  }

  private createEmailTooltip(): BaseComponent<HTMLDivElement> {
    const emailTooltip = createDiv(undefined, 'tooltip');
    emailTooltip.addClass('hidden');

    return emailTooltip;
  }

  private createEmailInput(): BaseComponent<HTMLInputElement> {
    const emailInput = createInput(undefined, 'email');
    const emailInputElement = emailInput.getElement();
    emailInputElement.placeholder = 'Enter your e-mail';
    emailInputElement.type = InputType.TEXT;

    return emailInput;
  }

  private createPasswordInputDiv(): BaseComponent<HTMLDivElement> {
    return createDiv(undefined, 'password-input');
  }

  private createPasswordWhitespace(): BaseComponent<HTMLSpanElement> {
    const passwordWhitespace = createSpan(undefined, 'error-message');
    passwordWhitespace.setText('Password must not contain leading or trailing whitespace');

    return passwordWhitespace;
  }

  private createPasswordSpecial(): BaseComponent<HTMLSpanElement> {
    const passwordSpecial = createSpan(undefined, 'error-message');
    passwordSpecial.setText(
      'Password must contain at least one special character (e.g., !@#$%^&*)',
    );

    return passwordSpecial;
  }

  private createPasswordDigit(): BaseComponent<HTMLSpanElement> {
    const passwordDigit = createSpan(undefined, 'error-message');
    passwordDigit.setText('Password must contain at least one digit (0-9)');

    return passwordDigit;
  }

  private createPasswordLowercase(): BaseComponent<HTMLSpanElement> {
    const passwordLowercase = createSpan(undefined, 'error-message');
    passwordLowercase.setText('Password must contain at least one lowercase letter (a-z)');

    return passwordLowercase;
  }

  private createPasswordUppercase(): BaseComponent<HTMLSpanElement> {
    const passwordUppercase = createSpan(undefined, 'error-message');
    passwordUppercase.setText('Password must contain at least one uppercase letter (A-Z)');

    return passwordUppercase;
  }

  private createPasswordLength(): BaseComponent<HTMLSpanElement> {
    const passwordLength = createSpan(undefined, 'error-message');
    passwordLength.setText('Password must be at least 8 characters long');

    return passwordLength;
  }

  private createPasswordTooltip(): BaseComponent<HTMLDivElement> {
    const passwordTooltip = createDiv(undefined, 'tooltip');
    passwordTooltip.addClass('hidden');

    return passwordTooltip;
  }

  private createPasswordControl(): BaseComponent<HTMLDivElement> {
    const passwordControl = createDiv(undefined, 'password-control');
    passwordControl.getElement().insertAdjacentHTML('afterbegin', eyeClose);

    return passwordControl;
  }

  private createPasswordInput(): BaseComponent<HTMLInputElement> {
    const passwordInput = createInput(undefined, 'password');
    const passwordInputElement = passwordInput.getElement();
    passwordInputElement.placeholder = 'Enter your password';
    passwordInputElement.type = InputType.PASSWORD;

    return passwordInput;
  }

  private createSubmitButton(): BaseComponent<HTMLButtonElement> {
    const submitButton = createButton(undefined, 'button');
    submitButton.setText('Sign In');
    submitButton.addClass('submit-button');
    submitButton.setAttribute('disabled', 'true');
    return submitButton;
  }
}

export const Login = (): LoginComponent => new LoginComponent();
