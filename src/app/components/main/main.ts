import { PlaceholderPage } from '@app/components/under-construction/under-construction';
import BaseComponent from '@common-components/base-component';
import { createH1 } from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import './main.scss';

class MainComponent extends BaseComponent<HTMLDivElement> {
  private readonly h1: BaseComponent<HTMLHeadingElement>;
  private readonly placeholder = PlaceholderPage();

  constructor(id: string = 'main-component', className: string = 'main-component') {
    super(Tags.DIV, id, className);

    this.h1 = createH1(undefined, 'heading-1');

    this.init();
  }

  protected renderComponent(): void {
    this.renderHeading1();
    this.renderPlaceholder();
  }

  protected addEventListeners(): void {
    return;
  }

  private renderHeading1(): void {
    this.h1.appendTo(this.getElement());
    this.h1.setText('Main Page');
  }

  private renderPlaceholder(): void {
    this.placeholder.appendTo(this.getElement());
  }
}

export const Main = (): MainComponent => new MainComponent();
