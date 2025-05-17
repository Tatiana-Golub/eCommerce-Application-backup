import BaseComponent from '@common-components/base-component';
import { createButton, createForm } from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import './login.scss';
import { emailValidatingInput } from '../common/input/email-validating-input';
import { passwordValidatingInput } from '../common/input/password-validating-input';
import { ApiErrorPopup } from '@components/api-error-popup/api-error-popup';
import { router } from '@/app/router';
import { SdkApi } from '@/app/utils/api/comerce-sdk-api';
import { UserCache } from '@/app/utils/api/token-cache';
import { PublishSubscriber } from '@/app/utils/event-bus/event-bus';
import { UserCache } from '@/app/utils/token-cache';

class LoginComponent extends BaseComponent<HTMLDivElement> {
  private ApiErrorPopup = ApiErrorPopup();
  private readonly form: BaseComponent<HTMLFormElement>;

  private readonly emailInputComponent = emailValidatingInput(this.updateSubmitButton.bind(this));
  private readonly passwordInputComponent = passwordValidatingInput(
    this.updateSubmitButton.bind(this),
  );
  private readonly submitButton: BaseComponent<HTMLButtonElement>;

  constructor(id: string = 'login-component', className: string = 'login-component') {
    super(Tags.DIV, id, className);

    this.form = createForm(undefined, 'login-form');
    this.submitButton = this.createSubmitButton();

    this.init();
  }

  protected renderComponent(): void {
    this.renderForm();
    this.renderEmailInputComponent();
    this.renderPasswordInputComponent();
    this.renderSubmitButton();
  }

  protected addEventListeners(): void {
    this.submitButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.onSubmit();
    });
  }

  private updateSubmitButton(): void {
    const validateEmailResults = this.emailInputComponent.isValid();
    const validatePasswordResults = this.passwordInputComponent.isValid();

    if (validateEmailResults && validatePasswordResults) {
      this.submitButton.removeAttribute('disabled');
    } else {
      this.submitButton.setAttribute('disabled', 'true');
    }
  }

  private renderErrorMessage(): void {
    this.ApiErrorPopup.appendTo(this.getElement());
  }

  private async onSubmit(): Promise<void> {
    const email = this.emailInputComponent.getInputValue();
    const password = this.passwordInputComponent.getInputValue();

    await SdkApi().loginUser(email, password);
    await SdkApi()
      .withPasswordFlow(email, password)
      .getMe()
      .then((response) => {
        UserCache.set(response.body);
      })
      .catch((error) => {
        this.ApiErrorPopup.setErrorMessage(error.message);
        this.renderErrorMessage();
      });
    PublishSubscriber().publish('userLoggedIn', { userId: email });
    router.navigate('#/main');
  }

  private renderForm(): void {
    this.form.appendTo(this.getElement());
  }

  private renderSubmitButton(): void {
    this.submitButton.appendTo(this.form.getElement());
  }

  private renderPasswordInputComponent(): void {
    this.passwordInputComponent.appendTo(this.form.getElement());
  }

  private renderEmailInputComponent(): void {
    this.emailInputComponent.appendTo(this.form.getElement());
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
