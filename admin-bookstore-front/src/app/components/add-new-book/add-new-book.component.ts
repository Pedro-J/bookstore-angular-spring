import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { AddBookService } from '../../services/add-book.service';
import { UploadImageService} from '../../services/upload-image.service';
import {setUpLocationSync} from "@angular/router/upgrade";

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css']
})
export class AddNewBookComponent implements OnInit {
  public bookAdded = false;
  public book: Book = new Book();

  constructor(private addBookService: AddBookService, private uploadImageService: UploadImageService) { }

  ngOnInit() {
    this.initBook();
  }

  onSubmit() {
    this.addBookService.sendBook(this.book).subscribe(
      res => {
        console.log('The has been saved sucessfully.');
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

  private initBook(): void {
    this.book.active = true;
    this.book.category = 'Management';
    this.book.language = 'english';
    this.book.format = 'papperback';
  }

}
