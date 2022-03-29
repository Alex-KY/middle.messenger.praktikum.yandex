import UserAPI from '../utils/api/UserAPI';
import store from '../utils/store';

import { baseResourcesApiUrl } from '../utils/HTTPTransport';

import { API, userPasswordFormModel, userDataFormModel } from '../utils/types';

const userApi = new UserAPI();

function prepareUserData(data: any) {
  const url = data.avatar;
  const path = url ? `${baseResourcesApiUrl}${url}` : url;

  return Object.assign(data, { avatar: path });
}

export default class UserController {
  public changeUserAvatar(form: FormData) {
    try {

      return userApi.changeUserAvatar(form)
        .then((res: API) => {
          store.set('userData', prepareUserData(res.data));
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
        store.set('userData', prepareUserData(res.data));
        return res;
      });

    } catch (error) {
      return error;
    }
  }
}
