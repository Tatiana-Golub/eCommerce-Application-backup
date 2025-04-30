type RouteHandler = () => void;

class Router {
  private routes: Map<string, RouteHandler> = new Map();

  constructor() {
    globalThis.addEventListener('hashchange', () => {
      this.handleRoute();
    });
  }

  public addRoute(path: string, handler: RouteHandler): void {
    this.routes.set(path, handler);
    console.log('routes:');
    console.log(this.routes);
  }

  public navigate(path: string): void {
    console.log(`navigating to path: ${path}`);
    globalThis.location.hash = path;
    this.handleRoute();
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
