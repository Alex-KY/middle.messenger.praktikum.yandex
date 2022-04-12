import EventBus from '../eventBus';

import { merge } from '../helpers';

import { User, Chats, Chat, ChatMessage, Indexed } from '../../utils/types';

interface storeData {
  userData?: User,
  chats?: Chats,
  activeChat?: Chat,
  activeChatMessages?: ChatMessage[]
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
    }), value as Indexed<unknown>);
    return merge(object as Indexed, result);
}

const eventBus = new EventBus();

class Store extends EventBus {
  static EVENTS = {
    STATE_SDU: "state:state-did-update"
  } as const;

  private _state: storeData = {};

  public getState(path?: string) {
    return path ? Object.entries(this._state).find(([key,]) => key === path)?.[1] : this._state;
  }

  public eventBus = eventBus;

  public getEvents() {
    return Store.EVENTS;
  }

  public set(path: keyof storeData, value: any) {
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

export default store;
