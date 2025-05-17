import BaseComponent from '../base-component';
import { createH3, createLabel } from '../base-component-factory';
import { checkbox, type Checkbox } from '../checkbox-component';
import type { CityValidatingInput } from '../input/city-validating-input';
import { cityValidatingInput } from '../input/city-validating-input';
import type { PostalCodeValidatingInput } from '../input/postal-code-validating-input';
import { postalCodeValidatingInput } from '../input/postal-code-validating-input';
import type { StreetValidatingInput } from '../input/street-validating-input';
import { streetValidatingInput } from '../input/street-validating-input';
import { Tags } from '../tags';
import type { CountrySelectOptionPair } from './country-select-component';
import { CountrySelect } from './country-select-component';

export class AddressComponent extends BaseComponent<HTMLDivElement> {
  private readonly coutriesPairs: Array<CountrySelectOptionPair> = [
    { value: 'USA', text: 'United States' },
  ];

  private readonly header: BaseComponent<HTMLHeadingElement>;
  private readonly streetInput: StreetValidatingInput;
  private readonly cityInput: CityValidatingInput;
  private readonly postalCodeInput: PostalCodeValidatingInput;
  private readonly countryLabel: BaseComponent<HTMLLabelElement>;
  private readonly countrySelect: CountrySelect;
  private readonly checkBox: Checkbox;

  private readonly onInputChangedCallback: (() => void) | null;

  constructor(
    id: string = 'address-component',
    className: string = 'address-component',
    headerText: string,
    checkboxText: string,
    onInputChangedCallback: (() => void) | null = null,
  ) {
    super(Tags.DIV, id, className);

    this.header = this.createHeader(headerText);
    this.streetInput = this.createStreetInput();
    this.cityInput = this.createCityInput();
    this.postalCodeInput = this.createPostalCodeInput();
    this.countryLabel = this.createCountryLabel();
    this.countrySelect = this.createCountrySelect();
    this.checkBox = this.createCheckBox(checkboxText);

    this.onInputChangedCallback = onInputChangedCallback;

    this.init();
  }

  protected renderComponent(): void {
    this.header.appendTo(this.getElement());
    this.streetInput.appendTo(this.getElement());
    this.cityInput.appendTo(this.getElement());
    this.postalCodeInput.appendTo(this.getElement());
    this.countryLabel.appendTo(this.getElement());
    this.countrySelect.appendTo(this.getElement());
    this.checkBox.appendTo(this.getElement());
  }

  protected addEventListeners(): void {
    // this.checkboxInput.addEventListener('change', () => {
    //   this.onInputChangedCallback?.();
    // });
  }

  private createHeader(text: string): BaseComponent<HTMLHeadingElement> {
    const header = createH3();
    header.setText(text);

    return header;
  }

  private createStreetInput(): StreetValidatingInput {
    return streetValidatingInput(this.onInputChangedCallback, {
      id: '',
      className: '',
      text: 'Street *',
    });
  }

  private createCityInput(): CityValidatingInput {
    return cityValidatingInput(this.onInputChangedCallback, {
      id: '',
      className: '',
      text: 'City *',
    });
  }

  private createPostalCodeInput(): PostalCodeValidatingInput {
    return postalCodeValidatingInput(this.onInputChangedCallback, {
      id: '',
      className: '',
      text: 'Postal code *',
    });
  }

  private createCountryLabel(): BaseComponent<HTMLLabelElement> {
    const label = createLabel(undefined, 'address-label');
    label.setText('Country *');

    return label;
  }

  private createCountrySelect(): CountrySelect {
    return new CountrySelect(this.coutriesPairs, this.onInputChangedCallback);
  }

  private createCheckBox(checkboxText: string): Checkbox {
    return checkbox(undefined, 'address-checkbox', null, checkboxText);
  }
}

export const addressComponent = (
  id: string = 'address-component',
  className: string = 'address-component',
  headerText: string,
  checkboxText: string,
  onInputChangedCallback: (() => void) | null = null,
): AddressComponent =>
  new AddressComponent(id, className, headerText, checkboxText, onInputChangedCallback);
