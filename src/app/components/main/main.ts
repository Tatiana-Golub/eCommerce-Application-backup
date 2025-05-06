import BaseComponent from '@common-components/base-component';
import { createDiv, createH3 } from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import './main.scss';
import { router } from '@/app/router';

class MainComponent extends BaseComponent<HTMLDivElement> {
  private readonly h3: BaseComponent<HTMLHeadingElement>;
  private readonly section: BaseComponent<HTMLDivElement>;

  constructor(id: string = 'main-component', className: string = 'main-component') {
    super(Tags.DIV, id, className);

    this.h3 = createH3(undefined, 'heading-3');
    this.section = createDiv(undefined, 'section');

    this.init();
  }

  protected renderComponent(): void {
    this.renderHeading3();
    this.renderSection();
  }

  protected addEventListeners(): void {
    this.addEventListenerHeading3();
  }

  private renderHeading3(): void {
    this.h3.appendTo(this.getElement());
    this.h3.setText('main');
  }

  private renderSection(): void {
    this.section.appendTo(this.getElement());
    this.section.setText('section');
  }

  private addEventListenerHeading3(): void {
    this.h3.addEventListener('click', () => {
      router.navigate('#/not-found');
    });
  }
}

export const Main = (): MainComponent => new MainComponent();
