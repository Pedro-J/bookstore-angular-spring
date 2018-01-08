import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private _credentials = {'username': '', 'password': ''};
  private _loggedIn = false;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.checkLogged().subscribe(
      res => {
        this._loggedIn = true;
      },
      erros => {
        this._loggedIn = false;
      }
    );
  }

  onSubmit() {
    this.loginService.sendCredentials(this._credentials.username, this._credentials.password)
      .subscribe(res => {
            console.log(res);
            localStorage.setItem('xAuthToken', res.json().token);
            this._loggedIn = true;
            location.reload();
        },
        error => {
          console.log(error);
        }
    );
  }


  get credentials(): { username: string; password: string } {
    return this._credentials;
  }

  set credentials(value: { username: string; password: string }) {
    this._credentials = value;
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  set loggedIn(value: boolean) {
    this._loggedIn = value;
  }
}
