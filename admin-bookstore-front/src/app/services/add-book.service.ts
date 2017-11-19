import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Book } from '../models/book';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AddBookService {

  constructor(private http: Http) {}

  sendBook(book: Book): Observable<Response>{
    const url = 'http://localhost:8080/book/add';

    const headers = new Headers({
      'Context-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(book), headers);
  }

}
