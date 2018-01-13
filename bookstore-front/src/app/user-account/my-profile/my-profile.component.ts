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

  private dataFetched = false;
  private loggedIn: boolean;
  private user: User = new User();
  private updateSuccess: boolean;
  private newPassword: string;
  private incorrectPassword: boolean;
  private currentPassword: string;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router ) { }

  onUpdateUserInfo () {
    this.userService.updateUserInfo(this.user, this.newPassword, this.currentPassword).subscribe(
      res => {
        console.log(res.text());
        this.updateSuccess = true;
        },
        error => {
          console.log(error.text());
          const errorMessage = error.text();
          if (errorMessage === 'Incorrect current password!') {
            this.incorrectPassword = true;
          }
      });
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe(
      res => {
        this.user = res.json();
        this.dataFetched = true;
        },
        error => {
          console.log(error);
      });
  }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      res => {
        this.loggedIn = true;
        },
      error => {
        this.loggedIn = false;
        console.log('inactive session');
        this.router.navigate(['/myAccount']);
      }
    );
    this.getCurrentUser();
  }

/*  onNewPayment() {
    this.paymentService.newPayment(this.userPayment).subscribe(
      res => {
        this.getCurrentUser();
        this.selectedBillingTab = 0;
      },
      error => {
        console.log(error.text());
      }
     );
  }*/

}
