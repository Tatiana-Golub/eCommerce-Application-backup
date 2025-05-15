import BaseComponent from '@common-components/base-component';
import { createButton, createForm } from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import './login.scss';
import { emailValidatingInput } from '../common/input/email-validating-input';
import { passwordValidatingInput } from '../common/input/password-validating-input';
import { ApiClient } from '@/app/utils/build-client';
import { SdkApi } from '@/app/utils/comerce-sdk-api';

class LoginComponent extends BaseComponent<HTMLDivElement> {
  private readonly form: BaseComponent<HTMLFormElement>;

  private readonly emailInputComponent = emailValidatingInput();
  private readonly passwordInputComponent = passwordValidatingInput();
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
    this.submitButton.addEventListener('click', () => this.onSubmit());
  }

  private async onSubmit(): Promise<void> {
    console.log('!!!!!!!!!!!Anonymous session flow');
    await SdkApi().withAnonymousSessionFlow().getProject();
    console.log('!!!!!!!!!!!Anonymous session cache:', ApiClient().getTokenCache().get());

    console.log('!!!!!!!!!!!Login session flow');
    await SdkApi().loginUser('vK3Kb@example.com', '123456');
    console.log('!!!!!!!!!!!Login session cache:', ApiClient().getTokenCache().get());

    console.log('!!!!!!!!!!!Password session flow');
    await SdkApi().withPasswordFlow('vK3Kb@example.com', '123456').getMe();
    console.log('!!!!!!!!!!!Password session cache:', ApiClient().getTokenCache().get());

    console.log('!!!!!!!!!!!Existing token session flow');
    const savedToken = ApiClient().getTokenCache()?.get();
    if (savedToken) {
      await SdkApi().withExistingToken(savedToken.token).getMe();
    }
    console.log('!!!!!!!!!!!Login session cache:', ApiClient().getTokenCache().get());

    console.log('!!!!!!!!!!!No token session flow');
    await SdkApi().getMe();
    console.log('!!!!!!!!!!!No token session cache:', ApiClient().getTokenCache().get());
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

    return submitButton;
  }
}

export const Login = (): LoginComponent => new LoginComponent();
