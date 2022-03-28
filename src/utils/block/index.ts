import EventBus from '../eventBus';
import renderDOM from '../renderDOM';

import { nanoid } from 'nanoid';

import { Props as Properties } from '../types';
export default abstract class Block<Props extends unknown | Properties> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  } as const;

  public id = nanoid(10).replace(/[0-9-_]/g, '');

  private _timeoutId: any;

  private _element: HTMLElement | null = null;

  private _eventBus: () => EventBus;

  protected props: Props;

  protected children: Record<string, Block<Props>>;

  protected rootString: string;

  constructor(props: Props) {
    const eventBus = new EventBus();

    this._eventBus = () => eventBus;
    this._registerEvents(eventBus);

    this.props = this._makePropsProxy(props) as Props;

    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this._eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
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
      if (this._timeoutId) return

      this._timeoutId = setTimeout(() => {
        this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
        clearTimeout(this._timeoutId);
        this._timeoutId = undefined;
      }, 200);
    }
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props) {
    return true;
  }

  public assignProps = (props: Props) => {
    if (!props) {
      return;
    }

    Object.assign(this.props, props);
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
    // console.warn('_render', this.id)
    // if (!this.rootString) {
    //   const parent = document.querySelector(`#${this.id}`)?.parentElement;
    //   if (parent) {
    //     console.warn([parent])
    //     this.rootString = parent?.id || [...(parent?.classList || '')]
    //       .map(item => item.trim() ? `.${item}` : ``)
    //       .join('')
    //   }
    // }

    this._addEvents();
    const element = document.querySelector(`#${this.id}`) as HTMLElement;
    console.warn([element], this.id)
    if (element) {
      element.outerHTML = this.render();
    }
    // renderDOM(this.render(), this.rootString);
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
    })
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
