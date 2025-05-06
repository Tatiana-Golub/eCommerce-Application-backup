type RouteHandler = () => void;

class Router {
  private routes: Map<string, RouteHandler> = new Map();
  private flag: boolean = false;

  constructor() {
    globalThis.addEventListener('hashchange', () => {
      if (this.flag) {
        this.handleRoute();
      }
      this.flag = true;
    });
  }

  public addRoute(path: string, handler: RouteHandler): void {
    this.routes.set(path, handler);
    console.log('routes:');
    console.log(this.routes);
  }

  public navigate(path: string): void {
    this.flag = true;
    console.log(`navigating to path: ${path}`);
    globalThis.location.hash = path;
    if (this.flag) {
      this.handleRoute();
    }
    this.flag = false;
  }

  public handleInitialRoute(): void {
    const currentHash = globalThis.location.hash ? globalThis.location.hash.replace('#', '') : '#/';
    console.log(`initial hash: ${globalThis.location.hash}`);
    this.navigate(currentHash);
  }

  private handleRoute(): void {
    const path = globalThis.location.hash || '';

    console.log('handleRoute:', path);

    const handler = this.routes.get(path) || this.routes.get('*');
    if (handler) {
      handler();
    } else {
      console.error(`Route not found: ${path}`);
    }
  }
}

export const router = new Router();
