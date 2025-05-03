import { PageWrapper } from '@app/page';
import { router } from '@app/router';
import type BaseComponent from '@common-components/base-component';
import { createDiv } from '@common-components/base-component-factory';
import './app.scss';

class App {
  private readonly pageWrapper = PageWrapper();
  private readonly root: BaseComponent<HTMLDivElement>;

  constructor() {
    this.root = createDiv('app', 'app');
    this.root.appendTo(document.body);
  }

  public start(): void {
    this.pageWrapper.appendTo(this.root.getElement());
    this.setupRoutes();
    router.handleInitialRoute();
  }

  public setupRoutes(): void {
    router.addRoute('#/', () => {
      this.pageWrapper.openNotFound();
    });

    router.addRoute('#/main', () => {
      this.pageWrapper.openNotFound();
    });

    router.addRoute('#/not-found', () => {
      this.pageWrapper.openNotFound();
    });
  }
}

const app = new App();
app.start();
