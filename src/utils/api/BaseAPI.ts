import HTTPTransport from '../HTTPTransport';

export default abstract class BaseAPI {
  constructor(endpoint?: string) {
    this.$http = new HTTPTransport(endpoint);
  }

  protected $http;
}
