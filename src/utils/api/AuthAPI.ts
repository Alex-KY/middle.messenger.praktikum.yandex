import BaseAPI from './BaseAPI';

export default class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  public logout() {
    return this.$http.post('/logout');
  }

  public signin(data: any) {
    return this.$http.post('/signin', { data });
  }

  public signup(data: any) {
    return this.$http.post('/signup', { data });
  }

  public fetchUser() {
    return this.$http.get('/user');
  }
}
