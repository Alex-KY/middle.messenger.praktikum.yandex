import ChatsAPI from '../utils/api/ChatsAPI';

import store from '../utils/store';

import { BASERESOURCESAPIURL } from '../utils/const';

import { API, User, ChatsParamsModel, CreateChatModel, ChatUsersModel, DeleteChatFormModel } from '../utils/types';

const avatar = require('/static/imgs/image.png');

const chatsApi = new ChatsAPI();

function prepareUserData(user: User): User {
  const url = user.avatar;
  const path = url ? `${BASERESOURCESAPIURL}${url}` : avatar;
  const preparedData = Object.entries(user)
    .reduce((acc, [key, value]) => {
      return Object.assign(acc, { [key]: [null, undefined].includes(value) ? '' : value });
    }, {}) as User;

  return Object.assign(preparedData, { avatar: path });
}

export default class ChatsController {
  public async fetchChats(params?: ChatsParamsModel): Promise<API> {
    const data = params ? params : { offset: 0, limit: 5, title: '' };
    const res = await chatsApi.fetchChats(data);

    if (res.data.reason) throw new Error(res.data.reason);

    const chats = res.data;

    if (!chats?.[0]?.last_message) {
      for (let i = 0; i < chats.length; i++) {
        const { id } = chats[i];

        const users = (await this.fetchChatUsers(id))?.data;
        chats[i].users = Array.isArray(users) ? users.map(user => prepareUserData(user)) : [];

        const news = (await this.fetchChatNews(id))?.data;
        chats[i].unread_count = !news?.reason ? news : 0;
      }
    }

    store.set('chats', chats);
    return res;
  }

  public fetchChatUsers(id: number): Promise<API> {
    return chatsApi.fetchChatUsers(id);
  }

  public fetchChatNews(id: number): Promise<API> {
    return chatsApi.fetchChatNews(id);
  }

  public createChat(data: CreateChatModel): Promise<API> {
    return chatsApi.createChat(data);
  }

  public setChatUsers(data: ChatUsersModel): Promise<API> {
    return chatsApi.setChatUsers(data);
  }

  public deleteChat(data: DeleteChatFormModel): Promise<API> {
    return chatsApi.deleteChat(data)
      .then((res: API) => {
        if (res.data) {
          store.set('activeChat', null);
        }

        return res;
      });
  }

  public fetchChatToken(id: number): Promise<string | undefined> {
    return chatsApi.fetchChatToken(id)
      .then((res: API) => {
        return res.data?.token;
      });
  }
}
