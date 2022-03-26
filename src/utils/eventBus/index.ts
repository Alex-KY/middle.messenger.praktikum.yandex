export default class EventBus {
  private _listeners: any = {};

  on(event: any, callback: any) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    this._listeners[event].push(callback);
  }

  off(event: any, callback: any) {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this._listeners[event] = this._listeners[event].filter(
      (listener: any) => listener !== callback
    );
  }

  emit(event: any, ...args: any[]) {
    if (!this._listeners[event]) {
      return;
    }

    this._listeners[event]!.forEach(function(listener: any) {
      listener(...args);
    });
  }
}
