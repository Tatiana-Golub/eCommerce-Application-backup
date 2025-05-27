import { Tags } from '@app/components/common/tags';
import BaseComponent from '@components/common/base-component';
import {
  createButton,
  createDiv,
  createForm,
  createH2,
  createH3,
} from '@components/common/base-component-factory';
import { dateValidatingInput } from '@components/common/input/date-validating-input';
import type { DateValidatingInput } from '@components/common/input/date-validating-input';
import { emailValidatingInput } from '@components/common/input/email-validating-input';
import type { EmailValidatingInput } from '@components/common/input/email-validating-input';
import { firstNameValidatingInput } from '@components/common/input/first-name-validating-input';
import type { FirstNameValidatingInput } from '@components/common/input/first-name-validating-input';
import { lastNameValidatingInput } from '@components/common/input/last-name-validating-input';
import type { LastNameValidatingInput } from '@components/common/input/last-name-validating-input';
import type { ProfileAddressComponent } from './profile-address-component';
import { profileAddressComponent } from './profile-address-component';
import './profile.scss';

class ProfileComponent extends BaseComponent<HTMLDivElement> {
  private readonly h2: BaseComponent<HTMLHeadingElement>;
  private readonly form: BaseComponent<HTMLFormElement>;
  private readonly personalInfoWrapper: BaseComponent<HTMLDivElement>;
  private readonly firstNameInput: FirstNameValidatingInput;
  private readonly lastNameInput: LastNameValidatingInput;
  private readonly dateInput: DateValidatingInput;
  private readonly emailInput: EmailValidatingInput;
  private readonly personalInfoHeader: BaseComponent<HTMLDivElement>;
  private readonly personalInfoTitle: BaseComponent<HTMLHeadingElement>;
  private readonly editButton: BaseComponent<HTMLButtonElement>;
  private readonly changePassword: BaseComponent<HTMLButtonElement>;
  private readonly addressWrapper: BaseComponent<HTMLDivElement>;
  private readonly addressInfoHeader: BaseComponent<HTMLDivElement>;
  private readonly addressInfoTitle: BaseComponent<HTMLHeadingElement>;
  private readonly addAddress: BaseComponent<HTMLButtonElement>;

  private address1: ProfileAddressComponent;
  private address2: ProfileAddressComponent;

  constructor(id: string = 'profile-component', className: string = 'profile-component') {
    super(Tags.DIV, id, className);

    this.h2 = createH2(undefined, 'heading-2');
    this.form = createForm(undefined, 'profile-form');
    this.personalInfoWrapper = createDiv(undefined, 'personal-info');
    this.personalInfoHeader = createDiv(undefined, 'personal-info-header');
    this.personalInfoTitle = createH3(undefined, 'heading-3');
    this.editButton = this.createEditButton();
    this.firstNameInput = this.createFirstNameInput();
    this.lastNameInput = this.createLastNameInput();
    this.dateInput = this.createDateInput();
    this.emailInput = this.createEmailInput();
    this.changePassword = this.createChangePassword();

    this.addressWrapper = createDiv(undefined, 'address-info');
    this.addressInfoHeader = createDiv(undefined, 'address-info-header');
    this.addressInfoTitle = createH3(undefined, 'heading-3');
    this.addAddress = this.createaddAddressButton();
    this.address1 = profileAddressComponent(
      undefined,
      'profile-address-component',
      'Address',
      null,
    );
    this.address2 = profileAddressComponent(
      undefined,
      'profile-address-component',
      'Address',
      null,
    );

    this.setAddresses();

    this.init();
  }

  protected addEventListeners(): void {}

  protected renderComponent(): void {
    this.renderH2();
    this.renderForm();
    this.personalInfoWrapper.appendTo(this.form.getElement());
    this.personalInfoHeader.appendTo(this.personalInfoWrapper.getElement());
    this.renderPersonalInfoTitle();
    this.editButton.appendTo(this.personalInfoTitle.getElement());
    this.firstNameInput.appendTo(this.personalInfoWrapper.getElement());
    this.lastNameInput.appendTo(this.personalInfoWrapper.getElement());
    this.dateInput.appendTo(this.personalInfoWrapper.getElement());
    this.emailInput.appendTo(this.personalInfoWrapper.getElement());
    this.changePassword.appendTo(this.personalInfoWrapper.getElement());

    this.addressWrapper.appendTo(this.form.getElement());
    this.addressInfoHeader.appendTo(this.addressWrapper.getElement());
    this.renderAddressInfoTitle();
    this.addAddress.appendTo(this.addressInfoHeader.getElement());
    this.address1.appendTo(this.addressWrapper.getElement());
    this.address2.appendTo(this.addressWrapper.getElement());
  }

  private renderH2(): void {
    this.h2.setText('User Profile');
    this.h2.appendTo(this.getElement());
  }

  private renderForm(): void {
    this.form.appendTo(this.getElement());
  }

  private renderPersonalInfoTitle(): void {
    this.personalInfoTitle.setText('Personal Info');
    this.personalInfoTitle.appendTo(this.personalInfoHeader.getElement());
  }

  private renderAddressInfoTitle(): void {
    this.addressInfoTitle.setText('Addresses');
    this.addressInfoTitle.appendTo(this.addressInfoHeader.getElement());
  }

  private createEditButton(): BaseComponent<HTMLButtonElement> {
    const editButton = createButton(undefined, 'button');
    editButton.setText('Edit');
    editButton.addClass('edit-button');
    return editButton;
  }

  private createChangePassword(): BaseComponent<HTMLButtonElement> {
    const changePasswordButton = createButton(undefined, 'button');
    changePasswordButton.setText('Change Password');
    changePasswordButton.addClass('change-password-button');
    return changePasswordButton;
  }

  private createaddAddressButton(): BaseComponent<HTMLButtonElement> {
    const addAddressButton = createButton(undefined, 'button');
    addAddressButton.setText('+ Add Address');
    addAddressButton.addClass('add-address-button');
    return addAddressButton;
  }

  private createFirstNameInput(): FirstNameValidatingInput {
    return firstNameValidatingInput(undefined, {
      id: '',
      className: '',
      text: 'First name',
    });
  }

  private createLastNameInput(): LastNameValidatingInput {
    return lastNameValidatingInput(undefined, {
      id: '',
      className: '',
      text: 'Last name',
    });
  }

  private createDateInput(): DateValidatingInput {
    return dateValidatingInput(undefined, {
      id: '',
      className: '',
      text: 'Date of birth',
    });
  }

  private createEmailInput(): EmailValidatingInput {
    return emailValidatingInput(undefined, {
      id: '',
      className: '',
      text: 'Email',
    });
  }

  private setAddresses(): void {
    this.address1.setData();
    this.address2.setData();

    this.address1.setUneditable();
    this.address2.setUneditable();
  }
}

export const Profile = (): ProfileComponent => new ProfileComponent();
