type Void = (...args: any[]) => void;
interface Events {
  [k: string]: Void[]
}

export default class EventBus {
  private _listeners: Events;

  constructor() {
    this._listeners = {};
  }

  on(event: string, callback: Void): void {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    this._listeners[event].push(callback);
  }

  off(event: string, callback: Void): void {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this._listeners[event] = this._listeners[event].filter(
      (listener: Void) => listener !== callback
    );
  }

  emit(event: string, ...args: any[]): void {
    if (!this._listeners[event]) {
      return;
    }

    if (Array.isArray(this._listeners[event])) {
      this._listeners[event].forEach(function(listener: Void) {
        listener(...args);
      });
    }
  }
}
