import ChatsAPI from '../utils/api/ChatsAPI';

import store from '../utils/store';

import { API, ChatsParamsModel, CreateChatModel, ChatUsersModel, DeleteChatFormModel } from '../utils/types';

const chatsApi = new ChatsAPI();

export default class ChatsController {
  public fetchChats(params?: ChatsParamsModel) {
    const data = params ? params : { offset: 0, limit: 5, title: '' }
    try {

      return chatsApi.fetchChats(data)
        .then((res: API) => {
          if (!res.data.reason) {
            store.set('chats', res.data);
          }

          return res;
        });

    } catch (error) {
      return error;
    }
  }

  public createChat(data: CreateChatModel) {
    try {

      return chatsApi.createChat(data);

    } catch (error) {
      return error;
    }
  }

  public setChatUsers(data: ChatUsersModel) {
    try {

      return chatsApi.setChatUsers(data);

    } catch (error) {
      return error;
    }
  }

  public deleteChat(data: DeleteChatFormModel) {
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

  public fetchChatToken(id: number) {
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
