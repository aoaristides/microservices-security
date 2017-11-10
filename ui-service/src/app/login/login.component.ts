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
      res => {
        // set the CSRF token
        var headers = res.headers;
        localStorage.setItem('csrfToken', headers.get('X-CSRF-TOKEN'));
        // set the X-SESSION-TOKEN token (session)
        localStorage.setItem('sessionToken', headers.get('X-SESSION-TOKEN'));
        // set the OAuth2 access token
        var data = res.json();
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
