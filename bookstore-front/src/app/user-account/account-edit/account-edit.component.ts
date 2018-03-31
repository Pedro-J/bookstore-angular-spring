import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {

  private _user: User = new User();
  private _updateSuccess: boolean;
  private _newPassword: string;
  private _currentPassword: string;

  private _incorrectPassword: boolean;
  private _emailExists = false;
  private _usernameExists = false;


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  public onUpdateUserInfo(): void {
    this.userService.updateUserInfo(this._user, this._newPassword, this._currentPassword).subscribe(
      res => {
        this._updateSuccess = true;
      },
      error => {
        const errorMessage = error.text().trim().toLowerCase();
        if ( errorMessage === 'IncorrectCurrentPassword'.toLowerCase() ) {
          this._incorrectPassword = true;
        } else if ( errorMessage === 'UsernameNotFound'.toLowerCase() ) {
          this._usernameExists = true;
        } else if ( errorMessage === 'EmailNotFound'.toLowerCase() ) {
          this._emailExists = true;
        }
      });
  }

  public getCurrentUser(): void {
    this.userService.getCurrentUser().subscribe(
      res => {
        this._user = res.json();
      },
      error => {
        console.log(error);
      });
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


  get emailExists(): boolean {
    return this._emailExists;
  }

  set emailExists(value: boolean) {
    this._emailExists = value;
  }

  get usernameExists(): boolean {
    return this._usernameExists;
  }

  set usernameExists(value: boolean) {
    this._usernameExists = value;
  }
}
