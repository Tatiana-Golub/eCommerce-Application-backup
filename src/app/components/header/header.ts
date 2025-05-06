import BaseComponent from '@common-components/base-component';
import { createDiv, createH3 } from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import './header.scss';

class HeaderComponent extends BaseComponent<HTMLDivElement> {
  private readonly h3: BaseComponent<HTMLHeadingElement>;

  constructor(id: string = 'header-component', className: string = 'header-component') {
    super(Tags.DIV, id, className);

    this.h3 = createH3(undefined, 'heading-3');

    this.init();
  }

  protected renderComponent(): void {
    this.renderHeading3();
  }

  protected addEventListeners(): void {
    this.addEventListenerHeading3();
  }

  private renderHeading3(): void {
    this.h3.appendTo(this.getElement());
    this.h3.setText('THIS IS HEADER');
  }

  private addEventListenerHeading3(): void {
    this.h3.addEventListener('click', () => {
      console.log('clicked');
    });
  }
}

export const Header = (): HeaderComponent => new HeaderComponent();
