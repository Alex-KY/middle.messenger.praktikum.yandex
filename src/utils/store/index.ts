import EventBus from '../eventBus';

import Block from '../block';

import { merge, isEqual } from '../helpers';

import { Props, User } from '../../utils/types';

export enum StoreEvents {
  Updated = 'updated'
}

type Indexed<T = unknown> = {
  [key in string]: T;
}

interface storeData {
  userData?: User
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

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
class Store extends EventBus {
  private state: storeData = {};

  public getState() {
    return this.state;
  }

  public set(path: keyof storeData, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated);
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
