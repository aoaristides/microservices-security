import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {HttpService} from "../components/httpservice";
import {environment} from "../../environments/environment";
import {Session} from "../models/session";

@Injectable()
export class SessionsService {

  constructor(private http: HttpService) {}

  getAll(): Observable<Session[]> {
    return this.http.get(environment.apiRoot + "/conference/sessions")
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  delete(code: string): Observable<Session> {
    return this.http.delete(environment.apiRoot + "/conference/sessions/" + code)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
