import {Component, OnInit} from "@angular/core";
import {Message, SelectItem} from "primeng/components/common/api";
import {SpeakersService} from "./speakers.service";
import {Speaker} from "../models/speaker";
import {LoadingPage} from "../loading/loading-indicator";

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html'
})
export class SpeakersComponent extends LoadingPage implements OnInit {

  records: Speaker[] = [];
  paymentFunding: SelectItem[];

  msgs: Message[] = [];


  constructor(private speakersService: SpeakersService) {
    super(false)
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.speakersService.getAll()
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
