import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  private _emailNotExists = false;
  private _forgetPasswordEmailSent: boolean;
  private _recoverEmail: string;

  constructor(private userService: UserService) { }

  ngOnInit() {

  }

  public onForgetPassword(): void {
    this._forgetPasswordEmailSent = false;
    this._emailNotExists = false;

    this.userService.retrievePassword(this._recoverEmail).subscribe(
      res => {
        console.log(res);
        this._forgetPasswordEmailSent = true;
      },
      error => {
        console.log(error.text());
        const errorMessage = error.text();
        if (errorMessage === 'Email not found') {
          this._emailNotExists = true;
        }
      }
    );
  }

  get emailNotExists(): boolean {
    return this._emailNotExists;
  }

  set emailNotExists(value: boolean) {
    this._emailNotExists = value;
  }

  get forgetPasswordEmailSent(): boolean {
    return this._forgetPasswordEmailSent;
  }

  set forgetPasswordEmailSent(value: boolean) {
    this._forgetPasswordEmailSent = value;
  }

  get recoverEmail(): string {
    return this._recoverEmail;
  }

  set recoverEmail(value: string) {
    this._recoverEmail = value;
  }
}
