import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {


  private username: string;
  private email: string;

  private emailSent = false;
  private usernameExists: boolean;
  private emailExists: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {

  }

  public onNewAccount(): void {
    this.usernameExists = false;
    this.emailExists = false;
    this.emailSent = false;

    this.userService.newUser(this.username, this.email).subscribe(
      res => {
        console.log(res);
        this.emailSent = true;
      },
      error => {
        console.log(error.text());
        const errorMessage = error.text();
        if (errorMessage === 'usernameExists') {
          this.usernameExists = true;
        }
        if (errorMessage === 'emailExists') {
          this.emailExists = true;
        }
      }
    );
  }

}
