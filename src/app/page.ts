import BaseComponent from '@common-components/base-component';
import { Tags } from '@common-components/tags';
import { NotFound } from '@components/404/404';
import { Header } from './components/header/header';
import { Main } from './components/main/main';
import { PlaceholderPage } from './components/under-construction/under-construction';
import './page.scss';

// TODO: Clean up comments in this component
export class PageWrapperComponent extends BaseComponent<HTMLDivElement> {
  private readonly notFound = NotFound();
  private readonly main = Main();
  private readonly header = Header();
  private readonly placeholder = PlaceholderPage();

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
    this.placeholder.remove();
    this.notFound.appendTo(this.getElement());
  }

  public openMain(): void {
    this.header.appendTo(this.getElement());
    this.main.appendTo(this.getElement());
    this.placeholder.remove();
    this.notFound.remove();
  }

  public openStore(): void {
    this.header.appendTo(this.getElement());
    this.placeholder.appendTo(this.getElement());
    this.main.remove();
    this.notFound.remove();
  }

  public openAboutUs(): void {
    this.header.appendTo(this.getElement());
    this.placeholder.appendTo(this.getElement());
    this.main.remove();
    this.notFound.remove();
  }

  public openCart(): void {
    this.header.appendTo(this.getElement());
    this.placeholder.appendTo(this.getElement());
    this.main.remove();
    this.notFound.remove();
  }

  public openLogin(): void {
    this.header.appendTo(this.getElement());
    this.placeholder.appendTo(this.getElement());
    this.main.remove();
    this.notFound.remove();
  }

  public openRegister(): void {
    this.header.appendTo(this.getElement());
    this.placeholder.appendTo(this.getElement());
    this.main.remove();
    this.notFound.remove();
  }

  public openProfile(): void {
    this.header.appendTo(this.getElement());
    this.placeholder.appendTo(this.getElement());
    this.main.remove();
    this.notFound.remove();
  }

  protected renderComponent(): void {
    this.openMain();
  }

  protected addEventListeners(): void {
    return;
  }
}

export const PageWrapper = (): PageWrapperComponent => new PageWrapperComponent();
