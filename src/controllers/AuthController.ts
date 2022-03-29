import AuthAPI from '../utils/api/AuthAPI';
import store from '../utils/store';

import { baseResourcesApiUrl } from '../utils/HTTPTransport';

import { API, SingupFormModel, SinginFormModel } from '../utils/types';

const authApi = new AuthAPI();

function prepareDataToRequest(data: SingupFormModel | SinginFormModel) {
  return JSON.stringify(data);
}

function prepareUserData(data: any) {
  const url = data.avatar;
  const path = url ? `${baseResourcesApiUrl}${url}` : url;

  return Object.assign(data, { avatar: path });
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
        .then((res: API) => {
          store.set('userData', prepareUserData(res.data));
          return res;
        });

    } catch (error) {
      return error;
    }
  }
}
