import UserAPI from '../utils/api/UserAPI';

import store from '../utils/store';

import { baseResourcesApiUrl } from '../utils/HTTPTransport';

import { API, UserPasswordFormModel, UserDataFormModel, UserSearchModel } from '../utils/types';

const userApi = new UserAPI();

function prepareUserData(data: any) {
  const url = data.avatar;
  const path = url ? `${baseResourcesApiUrl}${url}` : url;
  const preparedData = Object.entries(data)
    .reduce((acc, [key, value]) => {
      return Object.assign(acc, { [key]: [null, undefined].includes(value) ? '' : value });
    }, {});

  return Object.assign(preparedData, { avatar: path });
}

export default class UserController {
  public changeUserAvatar(form: FormData) {
    try {

      return userApi.changeUserAvatar(form)
        .then((res: API) => {
          if (res.data) {
            store.set('userData', prepareUserData(res.data));
          }

          console.warn(res)
          return res;
        });

    } catch (error) {
      return error;
    }
  }

  public changeUserPassword(data: UserPasswordFormModel) {
    try {

      return userApi.changeUserPassword(data);

    } catch (error) {
      return error;
    }
  }

  public changeUserData(data: UserDataFormModel) {
    try {

      return userApi.changeUserData(data)
      .then((res: API) => {
        if (res.data) {
          store.set('userData', prepareUserData(res.data));
        }

        return res;
      });

    } catch (error) {
      return error;
    }
  }

  public searchUser(data: UserSearchModel) {
    try {

      return userApi.searchUser(data);

    } catch (error) {
      return error;
    }
  }
}
