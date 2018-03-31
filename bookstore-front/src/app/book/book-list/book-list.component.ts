import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { Book } from '../book.model';
import { BookService} from '../book.service';
import 'rxjs/add/observable/of';
import {AppConst} from '../../constants/app-const';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  private _serverPath = AppConst.FULL_API_BASE_PATH;
  private _filterQuery = '';
  private _rowsOnPage = 5;

  private _sortBy = 'title';
  private _sortOrder = 'asc';

  private _selectedBook: Book;
  private _bookList = [];

  constructor(private route: ActivatedRoute, private router: Router, private bookService: BookService) { }

  ngOnInit() {

    this.route.queryParams.subscribe( (params: Params) => {
      if ( params['_bookList']) {
        this._bookList = JSON.parse(params['_bookList']);
      } else {
        this.bookService.getBookList().subscribe(
          res => {
            console.log(res);
            this._bookList = res.json();
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  public onSelect(book: Book): void {
    this._selectedBook = book;
    this.router.navigate(['/bookDetail', this._selectedBook.id]);
  }

  get selectedBook(): Book {
    return this._selectedBook;
  }

  set selectedBook(value: Book) {
    this._selectedBook = value;
  }

  get bookList(): any[] {
    return this._bookList;
  }

  set bookList(value: any[]) {
    this._bookList = value;
  }

  get filterQuery(): string {
    return this._filterQuery;
  }

  set filterQuery(value: string) {
    this._filterQuery = value;
  }

  get rowsOnPage(): number {
    return this._rowsOnPage;
  }

  set rowsOnPage(value: number) {
    this._rowsOnPage = value;
  }

  get serverPath(): string {
    return this._serverPath;
  }

  set serverPath(value: string) {
    this._serverPath = value;
  }

  get sortBy(): string {
    return this._sortBy;
  }

  set sortBy(value: string) {
    this._sortBy = value;
  }

  get sortOrder(): string {
    return this._sortOrder;
  }

  set sortOrder(value: string) {
    this._sortOrder = value;
  }
}
