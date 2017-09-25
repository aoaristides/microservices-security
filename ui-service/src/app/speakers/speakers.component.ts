import {Component, OnInit} from "@angular/core";
import {Message, SelectItem} from "primeng/components/common/api";
import {SpeakersService} from "./speakers.service";
import {Speaker} from "../models/speaker";
import {LoadingPage} from "../loading/loading-indicator";
import {Router} from "@angular/router";

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html'
})
export class SpeakersComponent extends LoadingPage implements OnInit {

  records: Speaker[] = [];

  msgs: Message[] = [];


  constructor(private service: SpeakersService, private router: Router) {
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

  delete(speaker: Speaker) {
    this.service.delete(speaker.id)
      .subscribe(
        data => {
          this.getAll();
        },
        err => {
          alert(err);
          console.log(err);
          this.router.navigate(['speakers']);
        });
  }
}
