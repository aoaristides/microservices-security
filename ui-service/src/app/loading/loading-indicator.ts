import {Component, Input} from "@angular/core";

@Component({
    selector: 'loading-indicator',
    template: '<div class="loading-indicator" *ngIf="isloading"><div class="loading"><span class="glyphicon glyphicon-refresh spin"></span></div></div>',
    styleUrls: ['./loading-indicator.css']
})
export class LoadingIndicator {
  @Input("isLoading")
  public isloading: boolean = false;

  constructor() {}
}

export class LoadingPage {
    public loading: boolean;
    constructor(val: boolean) {
        this.loading = val;
    }
    standby() {
        this.loading = true;
    }
    ready() {
        this.loading = false;
    }
}
