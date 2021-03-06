import BaseAPI from './BaseAPI';

import { UserPasswordFormModel, UserDataFormModel, UserSearchModel } from '../types';

import { BASEAPIURL } from '../const';

export default class UserAPI extends BaseAPI {
  constructor() {
    super(BASEAPIURL, '/user');
  }

  public changeUserAvatar(form: FormData) {
    return this.$http.put('/profile/avatar', { data: form });
  }

  public changeUserPassword(data: UserPasswordFormModel) {
    return this.$http.put('/password', { data });
  }

  public changeUserData(data: UserDataFormModel) {
    return this.$http.put('/profile', { data });
  }

  public searchUser(data: UserSearchModel) {
    return this.$http.post('/search', { data });
  }
}
