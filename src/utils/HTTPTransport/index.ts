import { API } from "../types";

enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type Options = {
  method: Method,
  data?: any,
  title?: string,
  contentType?: string
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

export default class HTTPTransport {
  constructor(origin: string, endPoint?: string) {
    this.APIUrl = `${origin}${endPoint || ''}`;
  }

  protected APIUrl: string;

  protected formingResponse(res: API) {
    const { response, responseText, status, statusText } = res;
    let data;

    if (typeof response === 'string') {
      try {
        data = JSON.parse(response);
      } catch (err) {
        data = JSON.parse(JSON.stringify(response));
      }
    }

    return { data, responseText, status, statusText };
  }

  public get(url: string, options: OptionsWithoutMethod = {}): Promise<API> {
    return this.request(`${this.APIUrl}${url}`, { ...options, method: Method.GET });
  }
  public post(url: string, options: OptionsWithoutMethod = {}): Promise<API> {
    return this.request(`${this.APIUrl}${url}`, { ...options, method: Method.POST });
  }
  public put(url: string, options: OptionsWithoutMethod = {}): Promise<API> {
    return this.request(`${this.APIUrl}${url}`, { ...options, method: Method.PUT });
  }
  public delete(url: string, options: OptionsWithoutMethod = {}): Promise<API> {
    return this.request(`${this.APIUrl}${url}`, { ...options, method: Method.DELETE });
  }

  protected async request(url: string, options: Options = { method: Method.GET }): Promise<API> {
    const { method, contentType = 'application/json' } = options;
    let data = options.data;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.withCredentials = true;
      xhr.setRequestHeader('credentials', 'include');
      xhr.setRequestHeader('mode', 'cors');
      if (data && !(data instanceof FormData)) {
        xhr.setRequestHeader('content-type', contentType);
        data = JSON.stringify(data);
      }

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === Method.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    })
    .then(this.formingResponse)
    .catch(this.formingResponse);
  }
}
