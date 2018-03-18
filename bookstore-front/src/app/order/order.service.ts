import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {AppConst} from '../constants/app-const';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class OrderService {

  private serverPath = AppConst.FULL_API_BASE_PATH;

  constructor(private http: Http) {}

  public getOrderList(): Observable<Response> {
    const url = this.serverPath + '/order/getOrderList';

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, {headers: tokenHeader});
  }

}
