import EventBus from '../eventBus';

import Block from '../block';

import { merge, isEqual } from '../helpers';

import { Props, User, Chats, Chat } from '../../utils/types';

type Indexed<T = unknown> = {
  [key in string]: T;
}

interface storeData {
  userData?: User,
  chats?: Chats,
  activeChat?: Chat
}

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== 'object') {
        return object;
    }
    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }
    const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    }), value as any);
    return merge(object as Indexed, result);
}

const eventBus = new EventBus();

class Store extends EventBus {
  static EVENTS = {
    STATE_SDU: "state:state-did-update"
  } as const;

  private _state: storeData = {};

  public getState(path?: string) {
    return path ? this._state[path] : this._state;
  }

  public eventBus = eventBus;

  public getEvents() {
    return Store.EVENTS;
  }

  public set(path: keyof storeData, value: unknown) {
    set(this._state, path, value);

    this.eventBus.emit(Store.EVENTS.STATE_SDU, path, value);
  }

  public get(path: keyof storeData) {
    return this._state[path];
  }

  public clear () {
    this._state = {};
  }
}

const store = new Store();

export function withStore(mapStateToProps: (state: storeData) => Record<string, unknown>) {
  return function(Component: typeof Block) {
    return class extends Component<Props> {
      constructor(props: any) {
        const state = mapStateToProps(store.getState());

        super({...props, ...state});

        const newState = mapStateToProps(store.getState());

        if (!isEqual(state, newState)) {
          store.on(StoreEvents.Updated, () => {
            this.setProps({...newState});
          });
        }
      }
    }
  }
};

export default store;
