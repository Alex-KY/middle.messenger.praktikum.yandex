import HTTPTransport from '../HTTPTransport';

export default abstract class BaseAPI {
  constructor(endpoint?: string) {
    this.$http = new HTTPTransport(endpoint);
  }

  protected formingResponse(res: any) {
    const { response, responseText, status, statusText } = res;
    return { data: JSON.parse(JSON.stringify(response)), responseText, status, statusText };
  }

  protected $http: any;

  protected create?() { throw new Error('Not implemented'); }

  protected request?(data: string) { throw new Error('Not implemented'); }

  protected update?() { throw new Error('Not implemented'); }

  protected delete?() { throw new Error('Not implemented'); }
}
