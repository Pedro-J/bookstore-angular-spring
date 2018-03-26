import { Component, OnInit } from '@angular/core';
import {BookService} from '../book.service';
import {AppConst} from '../../constants/app-const';
import {Book} from '../book.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Http} from '@angular/http';
import {ShoppingCartService} from '../../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  private _bookId: number;
  private _book: Book = new Book();
  private _serverPath = AppConst.FULL_API_BASE_PATH;
  private _numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  private _qty: number;

  private _addBookSuccess = false;
  private _notEnoughStock = false;

  constructor(
    private bookService: BookService,
    private cartService: ShoppingCartService,
    private router: Router,
    private http: Http,
    private route: ActivatedRoute
  ) { }

  public onAddToCart(): void {
    this.cartService.addItem(this._bookId, this._qty).subscribe(
      res => {
        console.log(res.text());
        this._addBookSuccess = true;
      },
      err => {
        console.log(err.text());
        this._notEnoughStock = true;
      }
    );
  }

  public ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this._bookId = Number.parseInt(params['id']);
    });

    this.bookService.getBook(this._bookId).subscribe(
      res => {
        this._book = res.json();
      },
      error => {
        console.log(error);
      }
    );

    this._qty = 1;
  }


  get bookId(): number {
    return this._bookId;
  }

  set bookId(value: number) {
    this._bookId = value;
  }

  get book(): Book {
    return this._book;
  }

  set book(value: Book) {
    this._book = value;
  }

  get serverPath(): string {
    return this._serverPath;
  }

  set serverPath(value: string) {
    this._serverPath = value;
  }

  get numberList(): number[] {
    return this._numberList;
  }

  set numberList(value: number[]) {
    this._numberList = value;
  }

  get qty(): number {
    return this._qty;
  }

  set qty(value: number) {
    this._qty = value;
  }

  get addBookSuccess(): boolean {
    return this._addBookSuccess;
  }

  set addBookSuccess(value: boolean) {
    this._addBookSuccess = value;
  }

  get notEnoughStock(): boolean {
    return this._notEnoughStock;
  }

  set notEnoughStock(value: boolean) {
    this._notEnoughStock = value;
  }
}
