import Route from "./Route";

type TRouteConstructor = {
  pathname: string;
  block: any;
  props?: any;
  exact?: true;
  needAuth?: boolean;
  isSecure?: boolean;
  redirectPath: string;
  onUnautorized?: any;
};

export class Router {
  public history: History;
  private routes: Route[];
  private _currentRoute!: Route;
  private _rootQuery: string;

  constructor(rootQuery: string) {
    this.routes = [];
    this.history = window.history;
    this._rootQuery = rootQuery;
  }

  use({
    pathname,
    block,
    props = {},
    exact = true,
    needAuth = false,
    isSecure = false,
    onUnautorized,
    redirectPath,
  }: TRouteConstructor) {
    const redirect = () => this.go(redirectPath);
    const route = new Route(
      pathname,
      block,
      { rootQuery: this._rootQuery, exact },
      props,
      needAuth,
      isSecure,
      onUnautorized,
      redirect
    );
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event: any) => {
      this._onRoute(event.currentTarget?.location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }
    this._currentRoute?.leave();
    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.go(-1);
  }

  forward() {
    this.history.go(1);
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
