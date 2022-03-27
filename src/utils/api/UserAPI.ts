import BaseAPI from './BaseAPI';

import { userPasswordFormModel } from '../types';

export default class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  public updateAvatar(form: FormData) {
    return this.$http.put('/profile/avatar', { data: form });
  }

  public changePassword(data: userPasswordFormModel) {
    return this.$http.put('/password', { data });
  }
}
