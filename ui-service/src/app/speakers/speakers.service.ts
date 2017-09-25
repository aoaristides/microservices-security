import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {HttpService} from "../components/httpservice";
import {environment} from "../../environments/environment";
import {Speaker} from "../models/speaker";

@Injectable()
export class SpeakersService {

  constructor(private http: HttpService) {}

  getAll(): Observable<Speaker[]> {
    return this.http.get(environment.apiRoot + "/speaker/speakers")
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  delete(id: number): Observable<Speaker> {
    return this.http.delete(environment.apiRoot + "/speaker/speakers/" + id)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
