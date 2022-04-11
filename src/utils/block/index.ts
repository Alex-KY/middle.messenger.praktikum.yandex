import EventBus from '../eventBus';

import { sanitize } from '../helpers';

import store from '../store';

import { nanoid } from 'nanoid';

import { Props as Properties } from '../types';
export default abstract class Block<Props extends Properties> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  } as const;

  private _state: string | string[] | undefined;

  public id = nanoid(10).replace(/[0-9-_]/g, '');

  private _timeoutId: NodeJS.Timer | undefined;

  private _element: HTMLElement | null = null;

  private _eventBus: () => EventBus;

  protected props: Props;

  protected children: Record<string, Block<Props>>;

  protected rootString: string | undefined;

  constructor(props: Props) {
    const eventBus = new EventBus();

    this._eventBus = () => eventBus;

    this._state = props?.watchState;

    this._registerEvents(eventBus);

    if (!props.state && this._state) {
      Object.assign(props, this._computeState());
    }

    this.rootString = props.rootString;

    this.props = this._makePropsProxy(props) as Props;

    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    if (this._state) {
      store.eventBus.on(store.getEvents().STATE_SDU, this._storeDidUpdate.bind(this));
    }
  }

  init() {
    this._eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  private _computeState() {
    if (Array.isArray(this._state)) {
      return this._state.reduce((acc, key) => {
        return Object.assign(acc, { [`${key}`]: store.getState(key) });
      }, {});
    } else if (typeof this._state === 'string') {
      return { [`${this._state}`]: store.getState(this._state) };
    }
  }

  private _storeDidUpdate(path: string) {
    if (!this._state) return

    const keys = Array.isArray(this._state) ?  this._state : [this._state];

    if (!keys.some(key => path.includes(key))) return;

    this._render();
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  protected componentDidMount() {
    this.dispatchComponentDidMount();
  }

  protected dispatchComponentDidMount() {
    this._eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate (oldProps: Props, newProps: Props) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      if (this._timeoutId) return;

      this._timeoutId = setTimeout(() => {
        const timeout = this._timeoutId;

        this._eventBus().emit(Block.EVENTS.FLOW_RENDER);

        if (timeout) {
          clearTimeout(timeout);
          this._timeoutId = undefined;
        }
      }, 200);
    }
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props) {
    return oldProps === newProps || true;
  }

  public setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render() {

    this._addEvents();

    const element = document.querySelector(`#${this.id}`) as HTMLElement;
    const root = document.querySelector(`${this.rootString}`) as HTMLElement;
    if (element) {
      element.outerHTML = sanitize(this.render());
    } else if (root) {
      root.innerHTML = sanitize(this.render());
    }
  }

  protected render(): string {
    return '';
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  private _makePropsProxy(props: Props): object {
    return new Proxy(props as unknown as object, {
      get: (target: Record<string, unknown>, prop: string) => {
        if (prop.indexOf('_') === 0) {
          throw new Error('Отказано в доступе');
        }

        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },

      set: (target: Record<string, unknown>, prop: string, value: unknown) => {
        const oldProps = {...target};
        target[prop] = value;

        this._eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },

      deleteProperty: () => {
        throw new Error('Отказано в доступе');
      }
    });
  }

  private _addEvents() {
    const events: { string: () => void; } | undefined = this.props?.events;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element?.addEventListener(event, listener);
    });
  }
}
