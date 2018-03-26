import { Injectable } from '@angular/core';
import { AppConst } from '../constants/app-const';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {UserPayment} from './user-payment.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class UserPaymentService {

  paymentListSubject = new Subject();
  paymentSelectSubject = new Subject();
  private serverPath: string = AppConst.FULL_API_BASE_PATH;

  constructor(private http: Http) { }

  public newUserPayment(payment: UserPayment): Observable<Response> {
    const url = this.serverPath + '/payments/add';

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(payment), {headers: tokenHeader});
  }

  public updateUserPayment(payment: UserPayment): Observable<Response> {
    const url = this.serverPath + '/payments/update';

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.put(url, JSON.stringify(payment), {headers: tokenHeader});
  }

  public getUserPaymentList(): Observable<Response> {
    const url = this.serverPath + '/payments/list';

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get(url,  {headers: tokenHeader});
  }

  public deleteUserPayment(id: number): Observable<Response> {
    const url = this.serverPath + '/payments/' + id;

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.delete(url, {headers: tokenHeader});
  }

  public setDefaultUserPayment (id: number): Observable<Response> {
    const url = this.serverPath + '/payments/setDefault';

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, id, {headers: tokenHeader});
  }
}
