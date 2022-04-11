import AuthAPI from '../utils/api/AuthAPI';

import store from '../utils/store';

import { BASERESOURCESAPIURL } from '../utils/const';

import { API, User, SingupFormModel, SinginFormModel } from '../utils/types';

const avatar = require('/static/imgs/image.png');

const authApi = new AuthAPI();

function prepareUserData(data: User) {
  const url = data.avatar;
  const path = url ? `${BASERESOURCESAPIURL}${url}` : avatar;

  return Object.assign(data, { avatar: path });
}

export default class AuthController {
  public signup(data: SingupFormModel): Promise<API> {
    return authApi.signup(data);
  }

  public signin(data: SinginFormModel): Promise<API> {
    return authApi.signin(data);
  }

  public logout(): Promise<API> {
    return authApi.logout()
    .then((res: API) => {
      if (res.data) {
        if (!res.data.reason) {
          store.clear();
        }
      }

      return res;
    });
  }

  public async fetchUser(): Promise<API> {
    const res = await authApi.fetchUser();

    if (!res.data.reason) {
      store.set('userData', prepareUserData(res.data));
    }

    return res;
  }
}
