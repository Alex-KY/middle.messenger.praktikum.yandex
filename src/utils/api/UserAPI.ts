import BaseAPI from './BaseAPI';

import { API, UserPasswordFormModel, UserDataFormModel, UserSearchModel } from '../types';

import { BASEAPIURL } from '../const';

export default class UserAPI extends BaseAPI {
  constructor() {
    super(BASEAPIURL, '/user');
  }

  public changeUserAvatar(form: FormData): Promise<API> {
    return this.$http.put('/profile/avatar', { data: form });
  }

  public changeUserPassword(data: UserPasswordFormModel): Promise<API> {
    return this.$http.put('/password', { data });
  }

  public changeUserData(data: UserDataFormModel): Promise<API> {
    return this.$http.put('/profile', { data });
  }

  public searchUser(data: UserSearchModel): Promise<API> {
    return this.$http.post('/search', { data });
  }
}
