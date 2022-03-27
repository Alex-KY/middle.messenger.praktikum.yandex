import UserAPI from '../utils/api/UserAPI';
import store from '../utils/store';

import { API, userPasswordFormModel } from '../utils/types';

const userApi = new UserAPI();

export default class UserController {
  public sendAvatar(form: FormData) {
    try {

      return userApi.updateAvatar(form)
        .then((res: API) => {
          store.set('userData', res.data);
          return res;
        });

    } catch (error) {
      return error;
    }
  }

  public changePassword(data: userPasswordFormModel) {
    try {

      return userApi.changePassword(data);

    } catch (error) {
      return error;
    }
  }
}
