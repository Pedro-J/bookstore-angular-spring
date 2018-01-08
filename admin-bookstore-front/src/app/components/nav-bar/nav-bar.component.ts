import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private _loggedIn = false;

  constructor(private loginService: LoginService, private router: Router) { }

  toggleDisplay() {
    this._loggedIn = !this._loggedIn;
  }

  ngOnInit() {
    this.loginService.checkLogged().subscribe(
      res => {
        this._loggedIn = true;
      },
      erros => {
        this._loggedIn = false;
      }
    );
    this.router.navigate(['/']);
    console.log('está: ' + this._loggedIn);
  }

  logout() {
    this.loginService.logout().subscribe(
      res => {
        console.log(res);
        location.reload();
      }
    );
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  set loggedIn(value: boolean) {
    this._loggedIn = value;
  }
}
