import AuthAPI from '../utils/api/AuthAPI';

import store from '../utils/store';

import { BASERESOURCESAPIURL } from '../utils/const';

import { API, User, SingupFormModel, SinginFormModel } from '../utils/types';

const authApi = new AuthAPI();

function prepareUserData(data: User) {
  const url = data.avatar;
  const path = url ? `${BASERESOURCESAPIURL}${url}` : url;

  return Object.assign(data, { avatar: path });
}

export default class AuthController {
  public signup(data: SingupFormModel): Promise<API | string> {
    try {
      return authApi.signup(data);
    } catch (error) {
      return error;
    }
  }

  public signin(data: SinginFormModel): Promise<API | string> {
    try {
      return authApi.signin(data);
    } catch (error) {
      return error;
    }
  }

  public logout(): Promise<API | string> {
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

  public fetchUser(): Promise<API | string> {
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
