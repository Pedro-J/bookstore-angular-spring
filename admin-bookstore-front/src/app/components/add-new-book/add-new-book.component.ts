import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { UploadImageService} from '../../services/upload-image.service';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css']
})
export class AddNewBookComponent implements OnInit {
  public bookAdded = false;
  public book: Book = new Book();

  constructor(private bookService: BookService, private uploadImageService: UploadImageService) { }

  ngOnInit() {
    this.initBook();
  }

  onSubmit() {
    this.bookService.saveNew(this.book).subscribe(
      res => {
        console.log('The image has been saved sucessfully.');
        console.log(res);
        this.uploadImageService.upload(JSON.parse(JSON.parse(JSON.stringify(res))._body).id);
        this.bookAdded = true;
        this.book = new Book();
        this.initBook();
      },
      error => {
        console.log(error);
      }
    );
  }

  imageUpload(event): void {
    this.uploadImageService.fileChangeEvent(event);
  }

  private initBook(): void {
    this.book.active = true;
    this.book.category = 'Management';
    this.book.language = 'english';
    this.book.format = 'papperback';
  }

}
