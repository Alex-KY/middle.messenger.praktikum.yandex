import UserAPI from '../utils/api/UserAPI';
import store from '../utils/store';

import { API, userPasswordFormModel, userDataFormModel } from '../utils/types';

const userApi = new UserAPI();

export default class UserController {
  public changeUserAvatar(form: FormData) {
    try {

      return userApi.changeUserAvatar(form)
        .then((res: API) => {
          store.set('userData', res.data);
          return res;
        });

    } catch (error) {
      return error;
    }
  }

  public changeUserPassword(data: userPasswordFormModel) {
    try {

      return userApi.changeUserPassword(data);

    } catch (error) {
      return error;
    }
  }

  public changeUserData(data: userDataFormModel) {
    try {

      return userApi.changeUserData(data)
      .then((res: API) => {
        store.set('userData', res.data);
        return res;
      });

    } catch (error) {
      return error;
    }
  }
}
