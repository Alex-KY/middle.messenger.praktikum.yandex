type Void = () => void;
interface Events {
  [k: string]: Void[]
}

export default class EventBus {
  private _listeners: Events;

  constructor() {
    this._listeners = {};
  }

  on(event: string, callback: () => Void) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    this._listeners[event].push(callback);
  }

  off(event: string, callback: () => Void) {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this._listeners[event] = this._listeners[event].filter(
      (listener: Void) => listener !== callback
    );
  }

  emit(event: string, ...args: Void[]) {
    if (!this._listeners[event]) {
      return;
    }

    if (Array.isArray(this._listeners[event])) {
      this._listeners[event].forEach(function(listener: () => void) {
        listener(...args);
      });
    }
  }
}
