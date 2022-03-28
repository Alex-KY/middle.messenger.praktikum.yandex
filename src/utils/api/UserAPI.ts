import BaseAPI from './BaseAPI';

import { userPasswordFormModel, userDataFormModel } from '../types';

export default class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  public changeUserAvatar(form: FormData) {
    return this.$http.put('/profile/avatar', { data: form });
  }

  public changeUserPassword(data: userPasswordFormModel) {
    return this.$http.put('/password', { data });
  }

  public changeUserData(data: userDataFormModel) {
    return this.$http.put('/profile', { data });
  }
}
