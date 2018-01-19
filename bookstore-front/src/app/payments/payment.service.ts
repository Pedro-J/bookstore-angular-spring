import { Injectable } from '@angular/core';
import { AppConst } from '../constants/app-const';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Payment} from './payment';

@Injectable()
export class PaymentService {
  private serverPath: string = AppConst.FULL_API_BASE_PATH;

  constructor(private http: Http) { }

  public newPayment(payment: Payment): Observable<Response> {
    const url = this.serverPath + '/payments/ad';

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(payment), {headers: tokenHeader});
  }

  public getPaymentList(): Observable<Response> {
    const url = this.serverPath + '/payments/list';

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get(url,  {headers: tokenHeader});
  }

  public deletePayment(id: number): Observable<Response> {
    const url = this.serverPath + '/payments/' + id;

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.delete(url, {headers: tokenHeader});
  }

  public setDefaultPayment (id: number): Observable<Response> {
    const url = this.serverPath + '/payment/setDefault';

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, id, {headers: tokenHeader});
  }
}
