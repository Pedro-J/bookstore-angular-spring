import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Book} from '../models/book';

@Injectable()
export class BookService {

  constructor(private http: Http) {}

  saveNew(book: Book): Observable<Response> {
    const url = 'http://localhost:8181/book/add';

    const headers = new Headers({
      'Content-Type': 'application/json;charset=UTF-8',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(book), {headers: headers});
  }

  getList(): Observable<Response> {
    const url = 'http://localhost:8181/book/list';
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers: headers});
  }

  getOne(id: number): Observable<Response> {
    const url = 'http://localhost:8181/book/' + id;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers: headers});
  }

  update(book: Book): Observable<Response> {
    const url = 'http://localhost:8181/book/update';

    const headers = new Headers({
      'Content-Type': 'application/json;charset=UTF-8',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.put(url, JSON.stringify(book), {headers: headers});
  }

  delete(id: number): Observable<Response> {
    const url = 'http://localhost:8181/book/' + id;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.delete(url, {headers: headers});
  }
}
