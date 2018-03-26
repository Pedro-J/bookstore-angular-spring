import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {

  private _username: string;
  private _email: string;

  private _emailSent = false;
  private _usernameExists: boolean;
  private _emailExists: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {

  }

  public onNewAccount(): void {
    this._usernameExists = false;
    this._emailExists = false;
    this._emailSent = false;

    this.userService.newUser(this._username, this._email).subscribe(
      res => {
        console.log(res);
        this._emailSent = true;
      },
      error => {
        console.log(error.text());
        const errorMessage = error.text();
        if (errorMessage === 'usernameExists') {
          this._usernameExists = true;
        }
        if (errorMessage === 'emailExists') {
          this._emailExists = true;
        }
      }
    );
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get emailSent(): boolean {
    return this._emailSent;
  }

  set emailSent(value: boolean) {
    this._emailSent = value;
  }

  get usernameExists(): boolean {
    return this._usernameExists;
  }

  set usernameExists(value: boolean) {
    this._usernameExists = value;
  }

  get emailExists(): boolean {
    return this._emailExists;
  }

  set emailExists(value: boolean) {
    this._emailExists = value;
  }
}
