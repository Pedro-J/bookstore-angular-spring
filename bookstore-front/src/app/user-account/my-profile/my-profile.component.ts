import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConst } from '../../constants/app-const';
import { UserService } from '../user.service';
import { LoginService } from '../login/login.service';
import { User } from '../user.model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  private _dataFetched = false;
  private _loggedIn: boolean;
  private _user: User = new User();
  private _updateSuccess: boolean;
  private _newPassword: string;
  private _incorrectPassword: boolean;
  private _currentPassword: string;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router ) { }

  onUpdateUserInfo () {
    this.userService.updateUserInfo(this._user, this._newPassword, this._currentPassword).subscribe(
      res => {
        console.log(res.text());
        this._updateSuccess = true;
        },
        error => {
          console.log(error.text());
          const errorMessage = error.text();
          if (errorMessage === 'Incorrect current password!') {
            this._incorrectPassword = true;
          }
      });
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe(
      res => {
        this._user = res.json();
        this._dataFetched = true;
        },
        error => {
          console.log(error);
      });
  }

  ngOnInit() {
    this.getCurrentUser();
  }


  get dataFetched(): boolean {
    return this._dataFetched;
  }

  set dataFetched(value: boolean) {
    this._dataFetched = value;
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  set loggedIn(value: boolean) {
    this._loggedIn = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get updateSuccess(): boolean {
    return this._updateSuccess;
  }

  set updateSuccess(value: boolean) {
    this._updateSuccess = value;
  }

  get newPassword(): string {
    return this._newPassword;
  }

  set newPassword(value: string) {
    this._newPassword = value;
  }

  get incorrectPassword(): boolean {
    return this._incorrectPassword;
  }

  set incorrectPassword(value: boolean) {
    this._incorrectPassword = value;
  }

  get currentPassword(): string {
    return this._currentPassword;
  }

  set currentPassword(value: string) {
    this._currentPassword = value;
  }
}
