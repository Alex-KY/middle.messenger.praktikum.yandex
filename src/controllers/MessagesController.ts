import MessagesAPI from "../utils/api/MessagesAPI";

import store from "../utils/store";

import EventBus from "../utils/eventBus";

import ChatsController from "./ChatsController";

import { MessagesAPI as Props, MessageFormModel } from '../utils/types';

const chatsController = new ChatsController();
const INTERVAL = 20000;

const messagesController = class MessagesController {
  static EventBus: EventBus = new EventBus();
  static status: string;
  static timeout: NodeJS.Timer | undefined;
  private _events(): Props['callback'] {
    return {
      onOpen: this._onOpenHandler.bind(this),
      onClose: this._onCloseHandler.bind(this),
      onMessage: this._onMessageHandler.bind(this),
      onError: this._onErrorHandler.bind(this)
    };
  }
  private $wss: MessagesAPI;

  protected formingResponse(res: MessageFormModel): MessageFormModel {
    const { data: response, type } = res;
    let data;

    if (typeof response === 'string') {
      try {
        data = JSON.parse(response);
      } catch (err) {
        data = JSON.parse(JSON.stringify(response));
      }
    }

    return { data, type };
  }

  constructor() {
    store.eventBus.on(store.getEvents().STATE_SDU, this._storeDidUpdate.bind(this));
  }

  private _storeDidUpdate(path: string) {
    if (!path.includes('activeChat')) return;

    const activeChatId: number = store.getState('activeChat')?.id;

    if (!activeChatId) {
      this.closeWSS();
    }
  }

  public async openWSS() {
    if (MessagesController.status === 'online') {
      this.closeWSS();
    }

    const chatId = store.getState('activeChat')?.id;
    const userId = store.getState('userData')?.id;

    if (!chatId || !userId) return;

    const token = await chatsController.fetchChatToken(chatId) as string;

    if (!token) return;

    const callback = this._events();

    this.$wss = new MessagesAPI({ userId, chatId, token, callback });
  }

  public closeWSS() {
    this.$wss.close();
  }

  public sendMessage(data: MessageFormModel = {}) {
    const { type = 'get old', content = '0' } = data;
    this.$wss.send({ type, content });
  }

  private _sendPing() {
    this.$wss.send({ type: 'ping'});
  }

  private _ping() {
    if (MessagesController.timeout) {
      clearTimeout(MessagesController.timeout);
      MessagesController.timeout = undefined;
    }

    MessagesController.timeout = setTimeout(() => {
      this._sendPing();
    }, INTERVAL);
  }

  private _onOpenHandler() {
    console.log('open socket');
    MessagesController.status = 'online';
    this.sendMessage();
  }

  private _onCloseHandler() {
    console.log('close socket');
    MessagesController.status = 'offline';

    if (MessagesController.timeout) {
      clearTimeout(MessagesController.timeout);
      MessagesController.timeout = undefined;
    }
  }

  private _onMessageHandler(e: Event) {
    console.log('message socket', e);
    const res = this.formingResponse(e);

    if (res.data?.type === 'pong') {
      MessagesController.status = 'online';
    } else if ((Array.isArray(res.data) || res.data?.type === 'message')) {
      const messages = store.getState('activeChatMessages') || [];
      const newMessages = Array.isArray(res.data) ? res.data : [res.data];

      store.set('activeChatMessages', (newMessages).concat(messages));

      chatsController.fetchChats();
    } else if (res.data?.type === 'error') {
      console.error(res.data.content);
    }

    this._ping();
  }

  private _onErrorHandler() {
    MessagesController.status = 'offline';
    this.$wss.close();
  }
};

export default new messagesController();
