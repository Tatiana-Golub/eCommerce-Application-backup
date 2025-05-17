import type { AddressComponent } from '../common/address-component/address-component';
import { addressComponent } from '../common/address-component/address-component';
import BaseComponent from '../common/base-component';
import { createButton, createForm } from '../common/base-component-factory';
import { dateValidatingInput } from '../common/input/date-validating-input';
import type { DateValidatingInput } from '../common/input/date-validating-input';
import type { EmailValidatingInput } from '../common/input/email-validating-input';
import { emailValidatingInput } from '../common/input/email-validating-input';
import type { FirstNameValidatingInput } from '../common/input/first-name-validating-input';
import { firstNameValidatingInput } from '../common/input/first-name-validating-input';
import type { LastNameValidatingInput } from '../common/input/last-name-validating-input';
import { lastNameValidatingInput } from '../common/input/last-name-validating-input';
import type { PasswordValidatingInput } from '../common/input/password-validating-input';
import { passwordValidatingInput } from '../common/input/password-validating-input';
import { Tags } from '../common/tags';
import './registration.scss';

class RegistrationComponent extends BaseComponent<HTMLDivElement> {
  private readonly form: BaseComponent<HTMLFormElement>;

  private readonly emailInput: EmailValidatingInput;
  private readonly passwordInput: PasswordValidatingInput;
  private readonly firstNameInput: FirstNameValidatingInput;
  private readonly lastNameInput: LastNameValidatingInput;
  private readonly dateInput: DateValidatingInput;
  private readonly shippingAddress: AddressComponent;
  private readonly signUp: BaseComponent<HTMLButtonElement>;

  constructor(id: string = 'registration-component', className: string = 'registration-component') {
    super(Tags.DIV, id, className);

    this.form = createForm(undefined, 'registration-form');
    this.emailInput = this.createEmailInput();
    this.passwordInput = this.createPasswordInput();
    this.firstNameInput = this.createFirstNameInput();
    this.lastNameInput = this.createLastNameInput();
    this.dateInput = this.createDateInput();
    this.shippingAddress = this.createShippingAddress();
    this.signUp = this.createSignUpButton();

    this.init();
  }

  protected renderComponent(): void {
    this.renderForm();
    this.emailInput.appendTo(this.form.getElement());
    this.passwordInput.appendTo(this.form.getElement());
    this.firstNameInput.appendTo(this.form.getElement());
    this.lastNameInput.appendTo(this.form.getElement());
    this.dateInput.appendTo(this.form.getElement());
    this.shippingAddress.appendTo(this.form.getElement());
    this.renderSignUpButton();
  }

  protected addEventListeners(): void {
    this.signUp.addEventListener('click', () => this.onSignUp());
  }

  private updateSignUpButton(): void {
    // const validateEmailResults = this.emailInputComponent.isValid();
    // const validatePasswordResults = this.passwordInputComponent.isValid();

    // if (validateEmailResults && validatePasswordResults) {
    if (false) {
      this.signUp.removeAttribute('disabled');
    } else {
      this.signUp.setAttribute('disabled', 'true');
    }
  }

  private async onSignUp(): Promise<void> {
    console.log('on SignUp click');
  }

  private renderForm(): void {
    this.form.appendTo(this.getElement());
  }

  private renderSignUpButton(): void {
    this.signUp.appendTo(this.form.getElement());
  }

  private createEmailInput(): EmailValidatingInput {
    return emailValidatingInput(this.updateSignUpButton.bind(this), {
      id: '',
      className: '',
      text: 'Email *',
    });
  }

  private createPasswordInput(): PasswordValidatingInput {
    return passwordValidatingInput(this.updateSignUpButton.bind(this), {
      id: '',
      className: '',
      text: 'Password *',
    });
  }

  private createFirstNameInput(): FirstNameValidatingInput {
    return firstNameValidatingInput(this.updateSignUpButton.bind(this), {
      id: '',
      className: '',
      text: 'First name *',
    });
  }

  private createLastNameInput(): LastNameValidatingInput {
    return lastNameValidatingInput(this.updateSignUpButton.bind(this), {
      id: '',
      className: '',
      text: 'Last name *',
    });
  }

  private createDateInput(): DateValidatingInput {
    return dateValidatingInput(this.updateSignUpButton.bind(this), {
      id: '',
      className: '',
      text: 'Date of birth *',
    });
  }

  private createShippingAddress(): AddressComponent {
    return addressComponent(
      undefined,
      'shipping-address-component',
      'Shipping Address',
      'Use as default shipping address',
      this.updateSignUpButton.bind(this),
    );
  }

  private createSignUpButton(): BaseComponent<HTMLButtonElement> {
    const signUpButton = createButton(undefined, 'button');
    signUpButton.setText('Sign Up');
    signUpButton.addClass('submit-button');
    signUpButton.setAttribute('disabled', 'true');
    return signUpButton;
  }
}

export const Registration = (): RegistrationComponent => new RegistrationComponent();
