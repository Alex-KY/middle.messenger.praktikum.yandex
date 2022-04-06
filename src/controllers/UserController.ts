import UserAPI from '../utils/api/UserAPI';

import store from '../utils/store';

import { BASERESOURCESAPIURL } from '../utils/const';

import { API, User, UserPasswordFormModel, UserDataFormModel, UserSearchModel } from '../utils/types';

const userApi = new UserAPI();

function prepareUserData(user: User) {
  const url = user.avatar;
  const path = url ? `${BASERESOURCESAPIURL}${url}` : url;
  const preparedData = Object.entries(user)
    .reduce((acc, [key, value]) => {
      return Object.assign(acc, { [key]: [null, undefined].includes(value) ? '' : value });
    }, {});

  return Object.assign(preparedData, { avatar: path });
}

export default class UserController {
  public changeUserAvatar(form: FormData): Promise<API | string> {
    try {
      return userApi.changeUserAvatar(form)
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

  public changeUserPassword(data: UserPasswordFormModel): Promise<API | string> {
    try {
      return userApi.changeUserPassword(data);
    } catch (error) {
      return error;
    }
  }

  public changeUserData(data: UserDataFormModel): Promise<API | string> {
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

  public searchUser(data: UserSearchModel): Promise<API | string> {
    try {
      return userApi.searchUser(data);
    } catch (error) {
      return error;
    }
  }
}
