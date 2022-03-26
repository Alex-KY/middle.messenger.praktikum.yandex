import BaseAPI from './BaseAPI';

export default class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }
  public logout() {
    return this.$http.post('/logout', { data: null })
    .then(this.formingResponse)
    .catch((error: string) => error);
  }

  public signin(data: any) {
    return this.$http.post('/signin', { data })
    .then(this.formingResponse)
    .catch((error: string) => error);
  }

  public signup(data: any) {
    return this.$http.post('/signup', { data })
      .then(this.formingResponse)
      .catch((error: string) => error);
  }

  public getUserInfo() {
    return this.$http.get('/user')
      .then(this.formingResponse)
      .catch((error: string) => error);
  }
}
