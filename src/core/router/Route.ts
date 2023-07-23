import Block from "../Block";
import renderDOM from "../renderDom";
import { store } from "../store";

function isEqual(lhs: any, rhs: any) {
  return lhs === rhs;
}

export interface IRouterProps {
  rootQuery: string;
  exact: boolean;
}

export default class Route {
  private _pathname: string;
  private _blockClass: Block;
  private _block!: Block;
  private _props: IRouterProps;
  private _componentProps: any;
  private _needAuth: boolean;
  private _isSecure: boolean;
  private _onUnautorized: any;
  private _redirect: () => void;

  constructor(
    pathname: string,
    view: Block,
    props: IRouterProps,
    componentProps: any,
    needAuth: boolean,
    isSecure: boolean,
    onUnautorized: boolean,
    redirect: () => void
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._props = props;
    this._needAuth = needAuth;
    this._isSecure = isSecure;
    this._onUnautorized = onUnautorized;
    this._componentProps = componentProps;
    this._redirect = redirect;
  }

  getParams(): {} {
    return Object.fromEntries(
      new URLSearchParams(document.location.search).entries()
    );
  }

  leave() {
    this._block?.destroy();
  }

  match(pathname: string) {
    if (this._props.exact) {
      return isEqual(pathname, this._pathname);
    } else {
      return ~pathname.indexOf(this._pathname);
    }
  }

  checkAuth() {
    if (this._needAuth) {
      if (typeof this._onUnautorized === "function") {
        return this._onUnautorized(this._pathname);
      }
    }
    return true;
  }

  render() {
    if (this._isSecure) {
      if (store.state.user) {
        this._redirect();
        return;
      }
    }
    if (this.checkAuth() && true) {
      // @ts-ignore
      this._block = new this._blockClass({
        ...this._componentProps,
        routerParams: this.getParams(),
      });
      renderDOM(this._block, this._props.rootQuery);
    } else {
      this._redirect();
    }
  }
}
