import UserAPI from '../utils/api/UserAPI';
import store from '../utils/store';

const userApi = new UserAPI();

export default class UserController {
  public sendAvatar(form: any) {
    try {

      return userApi.updateAvatar(form)
        .then((res: any) => {
          store.set('userData', res.data);
          return res;
        });

    } catch (error) {
      return error;
    }
  }
}
