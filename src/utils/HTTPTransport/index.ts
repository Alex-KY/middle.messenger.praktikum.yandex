enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
};

type Options = {
  method: METHOD,
  data?: any,
  title?: string,
  contentType?: string
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

export default class HTTPTransport {
  constructor(endpoint?: string) {
    this.APIUrl += (endpoint || '');
  }
  protected APIUrl = 'https://ya-praktikum.tech/api/v2';

  public get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(`${this.APIUrl}${url}`, { ...options, method: METHOD.GET });
  }
  public post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(`${this.APIUrl}${url}`, { ...options, method: METHOD.POST });
  }
  public put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(`${this.APIUrl}${url}`, { ...options, method: METHOD.PUT });
  }

  protected request(url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
    const { method, data, contentType = 'application/json' } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.withCredentials = true;
      xhr.setRequestHeader('credentials', 'include');
      xhr.setRequestHeader('mode', 'cors');
      if (!(data instanceof FormData)) xhr.setRequestHeader('content-type', contentType);

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}
