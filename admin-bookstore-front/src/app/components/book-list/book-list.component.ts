import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  private _selectedBook: Book;
  private _bookList: Book[];
  private _removeBookList: Book[] = new Array();
  private _allChecked: boolean;

  constructor(
    private bookservice: BookService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.bookservice.getList().subscribe(
      res => {
        console.log(res.json());
        this._bookList = res.json();
      },
      error => {
        console.log(error);
      }
    );
  }

  public onCheckAll(checkedValue: boolean): void {
    if ( checkedValue ) {
      this._removeBookList = this.bookList.slice(0);
    }else{
      this._removeBookList = [];
    }
    this._allChecked = checkedValue;
  }

  public onCheckOne(checkedValue: boolean, book: Book): void {
    if ( checkedValue ) {
      this._removeBookList.push(book);

      if ( this._removeBookList.length === this.bookList.length) {
        this.allChecked = true;
      }
    }else {
      const indexBook = this._removeBookList.indexOf(book);
      if ( indexBook !== -1 ) {
        this._removeBookList.splice(indexBook, 1);
      }
      this._allChecked = false;
    }
  }

  public isBookChecked(book: Book): boolean {
    const indexBook = this._removeBookList.indexOf(book);
    return indexBook !== -1 ? true : false;
  }

  public onSelected(book: Book) {
    console.log(book.id + '');
    this._selectedBook = book;
    this.router.navigate(['/viewBook', this._selectedBook.id]);
  }

  public openDialog(book: Book): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(
      answer => {
        if ( answer === 'yes' ) {
          this.bookservice.delete(book.id).subscribe(
            res => {
              const bookIndex = this.bookList.indexOf(book);
              this.bookList.splice(bookIndex, 1);
             },
            error => {
              console.log('error deleting book');
            }
          );
        }
      }
    );
  }

  public removeSelectedBooks(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(
      answer => {
        if ( answer === 'yes' ) {
          for ( const book of this.bookList ) {
            this.bookservice.delete(book.id).subscribe(
              res => {
                const bookIndex = this.bookList.indexOf(book);
                this.bookList.splice(bookIndex, 1);
              },
              error => {
                console.log('error deleting book');
              }
            );
          }

        }
      }
    );
  }

  get selectedBook(): Book {
    return this._selectedBook;
  }

  set selectedBook(value: Book) {
    this._selectedBook = value;
  }

  get bookList(): Book[] {
    return this._bookList;
  }

  set bookList(value: Book[]) {
    this._bookList = value;
  }

  get allChecked(): boolean {
    return this._allChecked;
  }

  set allChecked(value: boolean) {
    this._allChecked = value;
  }

  get removeBookList(): Book[] {
    return this._removeBookList;
  }

  set removeBookList(value: Book[]) {
    this._removeBookList = value;
  }
}
