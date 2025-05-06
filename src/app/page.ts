import BaseComponent from '@common-components/base-component';
import { Tags } from '@common-components/tags';
import { NotFound } from '@components/404/404';
import { Header } from './components/header/header';
import { Main } from './components/main/main';
import './page.scss';

// TODO: Clean up comments in this component
export class PageWrapperComponent extends BaseComponent<HTMLDivElement> {
  private readonly notFound = NotFound();
  private readonly main = Main();
  private readonly header = Header();

  constructor(id: string = 'page-wrapper-component', className: string = 'page-wrapper-component') {
    super(Tags.DIV, id, className);

    this.init();
  }

  /**
   * On-demand open for routings in App.ts.
   * Adds the notFound component to the page wrapper container.
   */
  public openNotFound(): void {
    this.header.appendTo(this.getElement());
    this.main.remove();
    this.notFound.appendTo(this.getElement());
  }

  public openMain(): void {
    this.header.appendTo(this.getElement());
    this.main.appendTo(this.getElement());
    this.notFound.remove();
  }

  protected renderComponent(): void {
    this.renderHeaderComponent();
  }

  protected addEventListeners(): void {
    return;
  }

  private renderHeaderComponent(): void {
    this.notFound.appendTo(this.getElement());
  }
}

export const PageWrapper = (): PageWrapperComponent => new PageWrapperComponent();
