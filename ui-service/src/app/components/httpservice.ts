import {Injectable} from "@angular/core";
import {Headers, Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class HttpService extends Http {

  constructor (backend: XHRBackend, options: RequestOptions) {
    let token = localStorage.getItem('accessToken');
    if (token) {
      options.headers.set('Authorization', 'Bearer ' + JSON.parse(token).access_token);
    }
    super(backend, options);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    let accessToken = localStorage.getItem('accessToken');
    let csrfToken = localStorage.getItem('csrfToken');
    let sessionToken = localStorage.getItem('sessionToken');

    if (!options) {
      // let's make a new option object
      options = {headers: new Headers()};
    }

    let headers;
    if (typeof url === 'string') {
      headers = options.headers;
    } else {
      headers = url.headers;
    }

    this.setToken('Authorization', 'Bearer ' + JSON.parse(accessToken).access_token, headers);
    this.setToken('X-CSRF-TOKEN', csrfToken, headers);
    this.setToken('X-SESSION-TOKEN', sessionToken, headers);

    return super.request(url, options).catch(this.catchAuthError(this));
  }

  private setToken(key: string, token: string, headers: Headers) {
    if (token) {
      headers.set(key, token);
    } else {
      headers.delete(key);
    }
  }

  private catchAuthError (self: HttpService) {
    // we have to pass HttpService's own instance here as `self`
    return (res: Response) => {
      console.log(res);
      if (res.status === 401) {
        // if not authenticated
        localStorage.removeItem('accessToken');
        window.location.href = window.location.href + '?' + new Date().getMilliseconds();
      }
      return Observable.throw(res);
    };
  }
}
