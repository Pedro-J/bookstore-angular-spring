import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  private selectedBook: Book;
  private checked: boolean;
  private bookList: Book[];
  private allChecked: boolean;
  private removeBookList: Book[] = new Array();

  constructor(
    private bookservice: BookService,
    private router: Router
  ) {}

  ngOnInit() {
    this.bookservice.getBookList().subscribe(
      res => {
        console.log(res.json());
        this.bookList = res.json();
      },
      error => {
        console.log(error);
      }
    );
  }

  uploadSelected(checked: boolean) {
    this.allChecked = checked;
  }

  updateRemoveBookList(checked: boolean) {

  }

  public onSelected(book: Book) {
    console.log(book.id + '');
    this.selectedBook = book;
    this.router.navigate(['/viewBook', this.selectedBook.id]);
  }

  openDialog(book: Book) {

  }

  removeSelectedBooks(): void {

  }
}
