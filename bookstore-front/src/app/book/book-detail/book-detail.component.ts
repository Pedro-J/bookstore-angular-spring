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

  private bookId: number;
  private book: Book = new Book();
  private serverPath = AppConst.FULL_API_BASE_PATH;
  private numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  private qty: number;

  private addBookSuccess = false;
  private notEnoughStock = false;

  constructor(
    private bookService: BookService,
    private cartService: ShoppingCartService,
    private router: Router,
    private http: Http,
    private route: ActivatedRoute
  ) { }

  onAddToCart(): void {
    this.cartService.addItem(this.bookId, this.qty).subscribe(
      res => {
        console.log(res.text());
        this.addBookSuccess = true;
      },
      err => {
        console.log(err.text());
        this.notEnoughStock = true;
      }
    );
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.bookId = Number.parseInt(params['id']);
    });

    this.bookService.getBook(this.bookId).subscribe(
      res => {
        this.book = res.json();
      },
      error => {
        console.log(error);
      }
    );

    this.qty = 1;
  }


}
