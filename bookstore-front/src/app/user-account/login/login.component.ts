import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private _loginError = false;
  private _credential = {'username': '', 'password': ''};

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  public onLogin(): void {
    this.loginService.sendCredential(this._credential.username, this._credential.password).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('xAuthToken', res.json().token);
        location.reload();
        this.router.navigate(['/home']);
      },
      error => {
        this.loginError = true;
      }
    );
  }

  get credential(): { username: string; password: string } {
    return this._credential;
  }

  set credential(value: { username: string; password: string }) {
    this._credential = value;
  }

  get loginError(): boolean {
    return this._loginError;
  }

  set loginError(value: boolean) {
    this._loginError = value;
  }
}
