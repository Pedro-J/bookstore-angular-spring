import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private loggedIn = false;

  constructor(private loginService:LoginService) { }

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
    console.log('está: ' + this.loggedIn);
  }

  doLogout(){
    this.loginService.logout().subscribe(
      res => {
        console.log(res);
        location.reload();
      }
    );
  }

}
