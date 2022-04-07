import HTTPTransport from '../HTTPTransport';

export default abstract class BaseAPI {
  constructor(origin: string, endpoint?: string) {
    this.$http = new HTTPTransport(origin, endpoint);
  }

  protected $http;
}
