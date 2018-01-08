import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {

  private _book: Book = new Book();
  private _bookId: number;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this._bookId = Number.parseInt(params['id']);
    });

    this.bookService.getOne(this._bookId).subscribe(
      res => {
        this._book = res.json();
      },
      error => {
        console.log(error);
      });
  }

  onEdit(book: Book): void {
    this.router.navigate(['/editBook', book.id]);
      /*.then( s => location.reload());*/
  }

  get book(): Book {
    return this._book;
  }

  set book(value: Book) {
    this._book = value;
  }

  get bookId(): number {
    return this._bookId;
  }

  set bookId(value: number) {
    this._bookId = value;
  }
}
