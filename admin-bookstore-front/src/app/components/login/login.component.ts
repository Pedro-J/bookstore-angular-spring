import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private credentials = {'username': '', 'password': ''};
  private loggedIn = false;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.checkLogged().subscribe(
      res => {
        this.loggedIn = true;
      },
      erros => {
        this.loggedIn = false;
      }
    );
  }

  onSubmit() {
    this.loginService.sendCredentials(this.credentials.username, this.credentials.password)
      .subscribe(res => {
            console.log(res);
            localStorage.setItem('xAuthToken', res.json().token);
            this.loggedIn = true;
            location.reload();
        },
        error => {
          console.log(error);
        }
    );
  }
}
