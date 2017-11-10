import {Injectable} from "@angular/core";
import {Headers, Http, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {environment} from "../../environments/environment";

@Injectable()
export class LoginService {

  constructor(private http: Http) {}

  login(username: string, password: string): Observable<Response> {
    let params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);
    params.append('client_id', 'client');

    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa('client:secret'));
    headers.append('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');

    return this.http.post(environment.apiRoot + "/uaa/oauth/token", params, {headers: headers})
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
