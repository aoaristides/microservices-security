import {Component, OnInit} from "@angular/core";
import {LoadingPage} from "../loading/loading-indicator";
import {AccessToken} from "../models/accesstoken";
import {Router} from "@angular/router";
import {LoginService} from "./login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent extends LoadingPage implements OnInit {

  accessToken: AccessToken;

  constructor(private loginService: LoginService, private router: Router) {
    super(false);
  }

  ngOnInit() {
    localStorage.removeItem('accessToken');
  }

  onLoginClick(username, password): void {
    this.loginService.login(username, password).subscribe(
      data => {
        this.accessToken = data;
        localStorage.setItem('accessToken', JSON.stringify(this.accessToken));
        this.router.navigate(['home']);
        this.ready();
      },
      err => {
        alert(err);
        console.log(err);
        this.ready();
      });
  }

}
