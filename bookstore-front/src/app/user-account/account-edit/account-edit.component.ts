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
  private _incorrectPassword: boolean;
  private _currentPassword: string;

  constructor(private userService: UserService) { }

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
      },
      error => {
        console.log(error);
      });
  }

  ngOnInit() {
    this.getCurrentUser();
  }

}
