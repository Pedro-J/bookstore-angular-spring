import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/Book';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css']
})
export class AddNewBookComponent implements OnInit {
  public bookAdded: boolean;
  public newBook: Book = new Book();

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {

  }

}
