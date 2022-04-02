import BaseAPI from './BaseAPI';

import { ChatsParamsModel, CreateChatModel, ChatUsersModel, DeleteChatFormModel } from '../types';

function prepareQueryParams(params: ChatsParamsModel) {
  return Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}

export default class UserAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  public fetchChats(params: ChatsParamsModel) {
    return this.$http.get(`?${prepareQueryParams(params)}`);
  }

  public createChat(data: CreateChatModel) {
    return this.$http.post('', { data });
  }

  public setChatUsers(data: ChatUsersModel) {
    return this.$http.put('/users', { data });
  }

  public deleteChat(data: DeleteChatFormModel) {
    return this.$http.delete(``, { data });
  }

  public fetchChatToken(id: number) {
    return this.$http.post(`/token/${ id }`);
  }
}
