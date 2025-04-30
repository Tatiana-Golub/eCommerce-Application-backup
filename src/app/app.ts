import { createDiv } from './components/common/base-component-factory';
import { PageWrapper } from './page';
import { router } from './router';
import BaseComponent from './components/common/base-component';
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
