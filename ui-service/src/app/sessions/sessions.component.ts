import {Component, OnInit} from "@angular/core";
import {SessionsService} from "./sessions.service";
import {LoadingPage} from "../loading/loading-indicator";
import {Session} from "../models/session";

@Component({
  selector: 'app-speakers',
  templateUrl: './sessions.component.html'
})
export class SessionsComponent extends LoadingPage implements OnInit {

  records: Session[] = [];

  constructor(private sessionsService: SessionsService) {
    super(false)
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.sessionsService.getAll()
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
}
