import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { UploadImageService } from '../../services/upload-image.service';
import { ActivatedRoute, Router, Params } from '@angular/router';


@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  private _bookId: number;
  private _book: Book = new Book();
  private _bookUpdated = false;

  constructor(
    private uploadImageService: UploadImageService,
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
      }
    );
  }

  imageUpload(event): void {
    this.uploadImageService.fileChangeEvent(event);
  }

  onSubmit() {
    this.bookService.update(this._book).subscribe(
      res => {
        console.log('The image has been updated sucessfully.');
        this.uploadImageService.upload(JSON.parse(JSON.parse(JSON.stringify(res))._body).id);
        this._bookUpdated = true;
      },
      error => {
        console.log(error);
      }
    );
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

  get bookUpdated(): boolean {
    return this._bookUpdated;
  }

  set bookUpdated(value: boolean) {
    this._bookUpdated = value;
  }
}
