import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../user-account/login/login.service';
import {NavigationExtras, Router} from '@angular/router';
import {Book} from '../../book/book.model';
import {BookService} from '../../book/book.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private _loggedIn = false;
  private _searchValue: string;
  private _title: string;
  private _bookList: Book[] = [];

  constructor(private loginService: LoginService, private _router: Router, private bookService: BookService) { }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      res => {
        this._loggedIn = true;
      },
      err => {
        this._loggedIn = false;
        this._router.navigate(['/home']);
      }
    );
  }

  public logout(): void {
    this.loginService.logout().subscribe(
      res => {
        location.reload();
      },
      err => {
        console.log(err);
      }
    );
  }

  public onSearchByTitle(): void {
    this.bookService.searchBook(this._title).subscribe(
      res => {
        this._bookList = res.json();
        console.log(this._bookList);
        const navigationExtras: NavigationExtras = {
          queryParams: {
            'bookList': JSON.stringify(this._bookList)
          }
        };

        this.router.navigate(['/bookList'], navigationExtras);
      },
      error => {
        console.log(error);
      }
    );
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  set loggedIn(value: boolean) {
    this._loggedIn = value;
  }

  get searchValue(): string {
    return this._searchValue;
  }

  set searchValue(value: string) {
    this._searchValue = value;
  }

  get router(): Router {
    return this._router;
  }

  set router(value: Router) {
    this._router = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
}
