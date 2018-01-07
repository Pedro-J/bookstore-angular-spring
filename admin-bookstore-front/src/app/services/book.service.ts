import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Book} from '../models/book';

@Injectable()
export class BookService {

  constructor(private http: Http) {}

  sendBook(book: Book): Observable<Response> {
    const url = 'http://localhost:8181/book/add';

    const headers = new Headers({
      'Content-Type': 'application/json;charset=UTF-8',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(book), {headers: headers});
  }

  getBookList(): Observable<Response> {
    const url = 'http://localhost:8181/book/list';
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers: headers});
  }

  getBook(id: number): Observable<Response> {
    const url = 'http://localhost:8181/book/' + id;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers: headers});
  }
}
