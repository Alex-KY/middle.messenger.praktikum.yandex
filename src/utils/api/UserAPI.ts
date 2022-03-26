import BaseAPI from './BaseAPI';

export default class UserAPI extends BaseAPI {
  public updateAvatar(form: any) {
    return this.$http.put('/profile/avatar', { data: form })
    .then(this.formingResponse)
    .catch((error: string) => error);
  }
}
