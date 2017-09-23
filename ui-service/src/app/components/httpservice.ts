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
    let token = localStorage.getItem('accessToken');

    if (!options) {
      // let's make a new option object
      options = {headers: new Headers()};
    }

    if(token){
      if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
        options.headers.set('Authorization', 'Bearer ' + JSON.parse(token).access_token);
      } else {
        // we have to add the token to the url object
        url.headers.set('Authorization', 'Bearer ' + JSON.parse(token).access_token);
      }
    }else{
      if (typeof url === 'string') {
        options.headers.delete('Authorization');
      }else{
        url.headers.delete('Authorization');
      }
    }

    return super.request(url, options).catch(this.catchAuthError(this));
  }

  private catchAuthError (self: HttpService) {
    // we have to pass HttpService's own instance here as `self`
    return (res: Response) => {
      console.log(res);
      if (res.status === 401 || res.status === 403) {
        // if not authenticated
        localStorage.removeItem('accessToken');
        window.location.href = window.location.href + '?' + new Date().getMilliseconds();
      }
      return Observable.throw(res);
    };
  }
}
