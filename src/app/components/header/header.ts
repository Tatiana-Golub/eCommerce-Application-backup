import { router } from '@app/router';
import BaseComponent from '@common-components/base-component';
import { createDiv, createH2, createImg } from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import { Nav } from './nav/nav';
import './header.scss';

class HeaderComponent extends BaseComponent<HTMLDivElement> {
  private readonly h2: BaseComponent<HTMLHeadingElement>;
  private readonly logoDiv: BaseComponent<HTMLDivElement>;
  private readonly logoImg: BaseComponent<HTMLImageElement>;
  private readonly navContainer: BaseComponent<HTMLDivElement>;

  constructor(id: string = 'header-component', className: string = 'header-component') {
    super(Tags.DIV, id, className);

    this.logoDiv = createDiv(undefined, 'logo-div');
    this.logoImg = createImg(undefined, 'logo-icon');
    this.h2 = createH2(undefined, 'heading-2');

    this.navContainer = Nav();

    this.init();
  }

  protected renderComponent(): void {
    this.renderLogoDiv();
    this.renderNav();
  }

  protected addEventListeners(): void {
    this.addEventListenerLogoDiv();
  }

  private renderLogoDiv(): void {
    this.logoDiv.appendTo(this.getElement());
    this.logoImg.appendTo(this.logoDiv.getElement());
    this.logoImg.setAttribute('src', '/assets/favicon/favicon.ico');
    this.logoImg.setAttribute('alt', 'Logo');
    this.h2.appendTo(this.logoDiv.getElement());
    this.h2.setText('Fantasy Store');
  }

  private addEventListenerLogoDiv(): void {
    this.logoDiv.addEventListener('click', () => {
      router.navigate('#/main');
      console.log('LogoDiv clicked');
    });
  }

  private renderNav(): void {
    this.navContainer.appendTo(this.getElement());
  }

  /*
  private addEventListenerNav(): void {
    this.navContainer.store.addEventListener('click', () => {
      router.navigate('#/not-found');
      console.log('Store clicked');
    });
  }
  */
}

export const Header = (): HeaderComponent => new HeaderComponent();
