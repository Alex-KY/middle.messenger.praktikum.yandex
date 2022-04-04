import AuthAPI from '../utils/api/AuthAPI';

import store from '../utils/store';

import { baseResourcesApiUrl } from '../utils/HTTPTransport';

import { API, User, SingupFormModel, SinginFormModel } from '../utils/types';

const authApi = new AuthAPI();

function prepareUserData(data: User) {
  const url = data.avatar;
  const path = url ? `${baseResourcesApiUrl}${url}` : url;

  return Object.assign(data, { avatar: path });
}

export default class AuthController {
  public signup(data: SingupFormModel) {
    try {

      return authApi.signup(data);

    } catch (error) {
      return error;
    }
  }

  public signin(data: SinginFormModel) {
    try {

      return authApi.signin(data);

    } catch (error) {
      return error;
    }
  }

  public logout() {
    try {

      return authApi.logout()
      .then((res: API) => {
        if (res.data) {
          if (!res.data.reason) {
            store.clear();
          }
        }

        return res;
      });

    } catch (error) {
      return error;
    }
  }

  public fetchUser() {
    try {

      return authApi.fetchUser()
        .then((res: API) => {
          if (res.data) {
            if (!res.data.reason) {
              store.set('userData', prepareUserData(res.data));
            }
          }

          return res;
        });

    } catch (error) {
      return error;
    }
  }
}
