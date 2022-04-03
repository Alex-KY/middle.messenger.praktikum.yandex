import { Props as Properties } from '../types';

interface Props extends Properties{
  rootQuery: string,
  classes: string
}

export default class Route {
  private _pathname: string;
  private _blockClass: unknown;
  private _block: string | null;
  private _props: Props;
  private _root: HTMLElement | null;

  constructor(pathname: string, view: unknown, props: Props) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props || {};
    this._root = document.querySelector(this._props.rootQuery);
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block = null;

      if (!this._root) return;

      this._root.innerHTML = '';
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props).render();
    }

    if (!this._root) {
      throw new Error('Root not found');
    }

    const classes: string[] = (this._props.classes).split(' ');

    this._root.classList.remove(...this._root.classList);
    this._root.classList.add(...classes);

    this._root.innerHTML = this._block || '';
  }
}
