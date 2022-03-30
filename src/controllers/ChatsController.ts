import ChatsAPI from '../utils/api/ChatsAPI';

import store from '../utils/store';

import { API, ChatsParamsModel, CreateChatModel, ChatUsersModel, DeleteChatFormModel } from '../utils/types';

const chatsApi = new ChatsAPI();

export default class UserController {
  public fetchChats(params: ChatsParamsModel) {
    try {

      return chatsApi.fetchChats(params)
        .then((res: API) => {
          if (res.data) {
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

      return chatsApi.setChatUsers(data)
      .then((res: API) => {
        // if (res.data) {
        //   store.set('userData', prepareUserData(res.data));
        // }

        return res;
      });

    } catch (error) {
      return error;
    }
  }

  public fetchChat(id: number) {
    try {

      return chatsApi.fetchChat(id)
        .then((res: API) => {
          if (res.data) {
            // store.set('currentChat', res.data);
            store.set('currentChat', { id });
          }

          return res;
        });

    } catch (error) {
      return error;
    }
  }

  public deleteChat(data: DeleteChatFormModel) {
    try {

      return chatsApi.deleteChat(data)
        .then((res: API) => {
          if (res.data) {
            store.set('currentChat', null);
          }

          return res;
        });

    } catch (error) {
      return error;
    }
  }
}
