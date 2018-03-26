import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  private _user: User = new User();
  private _selectedProfileTab = 0;

  constructor(private userService: UserService) { }

  public getCurrentUser(): void {
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

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get selectedProfileTab(): number {
    return this._selectedProfileTab;
  }

  set selectedProfileTab(value: number) {
    this._selectedProfileTab = value;
  }
}
