import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {AppConst} from '../constants/app-const';

@Injectable()
export class BookService {

  private serverPath: string = AppConst.FULL_API_BASE_PATH;

  constructor(private http: Http) { }

  public getBookList(): Observable<Response> {
    const url = this.serverPath + '/book/list';

    const tokenHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers: tokenHeaders});
  }

  getBook(id: number): Observable<Response> {
    const url = this.serverPath + '/book/' + id;

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, {headers: tokenHeader});
  }

  public searchBook(keyword: string): Observable<Response> {
    const url = this.serverPath + '/book/search';

    const tokenHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, keyword, {headers: tokenHeaders});
  }
}
