import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { Book } from '../book.model';
import { BookService} from '../book.service';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

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
}
