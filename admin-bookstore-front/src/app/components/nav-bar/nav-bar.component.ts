import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private loggedIn = false;

  constructor(private loginService: LoginService, private router: Router) { }

  toggleDisplay() {
    this.loggedIn = !this.loggedIn;
  }

  ngOnInit() {
    this.loginService.checkLogged().subscribe(
      res => {
        this.loggedIn = true;
      },
      erros => {
        this.loggedIn = false;
      }
    );
    this.router.navigate(['/']);
    console.log('está: ' + this.loggedIn);
  }

  logout() {
    this.loginService.logout().subscribe(
      res => {
        console.log(res);
        location.reload();
      }
    );
  }

}
