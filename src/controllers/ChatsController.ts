import ChatsAPI from '../utils/api/ChatsAPI';

import store from '../utils/store';

import { BASERESOURCESAPIURL } from '../utils/const';

import { API, User, ChatsParamsModel, CreateChatModel, ChatUsersModel, DeleteChatFormModel } from '../utils/types';

const chatsApi = new ChatsAPI();

function prepareUserData(user: User): User {
  const url = user.avatar;
  const path = url ? `${BASERESOURCESAPIURL}${url}` : url;
  const preparedData = Object.entries(user)
    .reduce((acc, [key, value]) => {
      return Object.assign(acc, { [key]: [null, undefined].includes(value) ? '' : value });
    }, {}) as User;

  return Object.assign(preparedData, { avatar: path });
}

export default class ChatsController {
  public async fetchChats(params?: ChatsParamsModel): Promise<API | string> {
    const data = params ? params : { offset: 0, limit: 5, title: '' };
    try {
      const res = await chatsApi.fetchChats(data);

      if (res.data.reason) throw new Error(res.data.reason);

      const chats = res.data;

      if (!chats?.[0]?.last_message) {
        for (let i = 0; i < chats.length; i++) {
          const { id } = chats[i];

          const users = await this.fetchChatUsers(id)?.data;
          chats[i].users = Array.isArray(users) ? users.map(user => prepareUserData(user)) : [];

          const news = await this.fetchChatNews(id)?.data;
          chats[i].unread_count = !news?.reason ? news : 0;
        }
      }

      store.set('chats', chats);
      return res;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  public fetchChatUsers(id: number): Promise<API | string> {
    try {
      return chatsApi.fetchChatUsers(id);
    } catch (error) {
      return error;
    }
  }

  public fetchChatNews(id: number): Promise<API | string> {
    try {
      return chatsApi.fetchChatNews(id);
    } catch (error) {
      return error;
    }
  }

  public createChat(data: CreateChatModel): Promise<API | string> {
    try {
      return chatsApi.createChat(data);
    } catch (error) {
      return error;
    }
  }

  public setChatUsers(data: ChatUsersModel): Promise<API | string> {
    try {
      return chatsApi.setChatUsers(data);
    } catch (error) {
      return error;
    }
  }

  public deleteChat(data: DeleteChatFormModel): Promise<API | string> {
    try {
      return chatsApi.deleteChat(data)
        .then((res: API) => {
          if (res.data) {
            store.set('activeChat', null);
          }

          return res;
        });
    } catch (error) {
      return error;
    }
  }

  public fetchChatToken(id: number): Promise<API | string> {
    try {
      return chatsApi.fetchChatToken(id)
        .then((res: API) => {
          return res.data?.token || res;
        });
    } catch (error) {
      return error;
    }
  }
}
