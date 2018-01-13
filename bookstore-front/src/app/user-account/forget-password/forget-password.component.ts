import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  private emailNotExists = false;
  private forgetPasswordEmailSent: boolean;
  private recoverEmail: string;

  constructor(private userService: UserService) { }

  ngOnInit() {

  }

  public onForgetPassword(): void {
    this.forgetPasswordEmailSent = false;
    this.emailNotExists = false;

    this.userService.retrievePassword(this.recoverEmail).subscribe(
      res => {
        console.log(res);
        this.forgetPasswordEmailSent = true;
      },
      error => {
        console.log(error.text());
        const errorMessage = error.text();
        if (errorMessage === 'Email not found') {
          this.emailNotExists = true;
        }
      }
    );
  }

}
