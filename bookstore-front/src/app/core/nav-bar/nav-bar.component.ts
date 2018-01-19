import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../user-account/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private _loggedIn = false;
  private _searchValue: string;

  constructor(private loginService: LoginService, private router: Router) { }

  logout() {
    this.loginService.logout().subscribe(
      res => {
        location.reload();
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      res => {
        this._loggedIn = true;
      },
      err => {
        this._loggedIn = false;
        this.router.navigate(['/home']);
      }
    );
  }

  onSearcyByTitle() {

  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  set loggedIn(value: boolean) {
    this._loggedIn = value;
  }

  get searchValue(): string {
    return this._searchValue;
  }

  set searchValue(value: string) {
    this._searchValue = value;
  }
}
