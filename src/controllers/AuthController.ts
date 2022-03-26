import AuthAPI from '../utils/api/AuthAPI';

import store from '../utils/store';

import { SingupFormModel, SinginFormModel } from '../utils/types';

const authApi = new AuthAPI();

function prepareDataToRequest(data: SingupFormModel | SinginFormModel) {
  return JSON.stringify(data);
}

export default class AuthController {
  public signup(data: SingupFormModel) {
    try {

      return authApi.signup(prepareDataToRequest(data));

    } catch (error) {
      return error;
    }
  }

  public signin(data: SinginFormModel) {
    try {

      return authApi.signin(prepareDataToRequest(data));

    } catch (error) {
      return error;
    }
  }

  public logout() {
    try {

      return authApi.logout();

    } catch (error) {
      return error;
    }
  }

  public fetchUser() {
    try {

      return authApi.getUserInfo()
        .then((res: any) => {
          store.set('userData', res.data);
          return res;
        });

    } catch (error) {
      return error;
    }
  }
}
