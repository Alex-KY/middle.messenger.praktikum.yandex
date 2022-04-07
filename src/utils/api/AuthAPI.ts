import BaseAPI from './BaseAPI';

import { SinginFormModel, SingupFormModel } from '../types';

import { BASEAPIURL } from '../const';

export default class AuthAPI extends BaseAPI {
  constructor() {
    super(BASEAPIURL, '/auth');
  }

  public logout() {
    return this.$http.post('/logout');
  }

  public signin(data: SinginFormModel) {
    return this.$http.post('/signin', { data });
  }

  public signup(data: SingupFormModel) {
    return this.$http.post('/signup', { data });
  }

  public fetchUser() {
    return this.$http.get('/user');
  }
}
