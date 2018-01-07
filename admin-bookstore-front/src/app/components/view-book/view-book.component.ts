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

  private book: Book = new Book();
  private bookId: number;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.bookId = Number.parseInt(params['id']);
    });

    this.bookService.getBook(this.bookId).subscribe(
      res => {
        this.book = res.json();
      },
      error => {
        console.log(error);
      });
  }



}
