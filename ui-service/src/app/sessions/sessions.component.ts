import {Component, OnInit} from "@angular/core";
import {SessionsService} from "./sessions.service";
import {LoadingPage} from "../loading/loading-indicator";
import {Session} from "../models/session";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html'
})
export class SessionsComponent extends LoadingPage implements OnInit {

  records: Session[] = [];

  constructor(private service: SessionsService, private router: Router) {
    super(false)
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll()
      .subscribe(
        data => {
          this.records = data;
          this.ready();
        },
        err => {
          console.log(err);
          this.ready();
        });
  }

  delete(session: Session) {
    this.service.delete(session.code)
      .subscribe(
        data => {
          this.getAll();
        },
        err => {
          alert(err);
          console.log(err);
          this.router.navigate(['sessions']);
        });
  }
}
