import BaseAPI from './BaseAPI';

import { ChatsParamsModel, CreateChatModel, ChatUsersModel, DeleteChatFormModel } from '../types';

import { BASEAPIURL } from '../const';

function prepareQueryParams(params: ChatsParamsModel) {
  return Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}

export default class UserAPI extends BaseAPI {
  constructor() {
    super(BASEAPIURL, '/chats');
  }

  public fetchChats(params: ChatsParamsModel) {
    return this.$http.get(`?${prepareQueryParams(params)}`);
  }

  public fetchChatUsers(id: number) {
    return this.$http.get(`/${id}/users`);
  }

  public fetchChatNews(id: number) {
    return this.$http.get(`/new/${id}`);
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
