const wss = 'wss://ya-praktikum.tech/ws/chats';

import { MessagesAPI as Props, MessageFormModel } from '../types';

export default class MessagesAPI {
  protected socket: WebSocket;

  constructor(props: Props) {
    const { userId, chatId, token, callback } = props;

    this.socket = new WebSocket(`${wss}/${userId}/${chatId}/${token}`);

    this._registerEvents(callback);
  }

  private _registerEvents(events: Props['callback']) {
    this.socket.addEventListener('open', events.onOpen);
    this.socket.addEventListener('close', events.onClose);
    this.socket.addEventListener('message', events.onMessage);
    this.socket.addEventListener('error', events.onError);
  }

  private _send(data: MessageFormModel) {
    return this.socket.send(JSON.stringify(data));
  }

  public send({ type, content }: MessageFormModel) {
    return this._send({ content, type });
  }

  public close() {
    return this.socket.close();
  }
}
