import { Injectable } from '@angular/core';
import { AppConst } from '../constants/app-const';
import { Http, Headers, Response } from '@angular/http';
import { UserShipping } from './user-shipping.model';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserShippingService {
  shippingListSubject = new Subject();
  shippingSelectSubject = new Subject();

  private serverPath: string = AppConst.FULL_API_BASE_PATH;

  constructor(private http: Http) { }

  public newUserShipping(shipping: UserShipping): Observable<Response> {
    const url = this.serverPath + '/userShipping/add';

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(shipping), {headers: tokenHeader});
  }

  public updateUserShipping(shipping: UserShipping): Observable<Response> {
    const url = this.serverPath + '/userShipping/update';

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.put(url, JSON.stringify(shipping), {headers: tokenHeader});
  }

  public getUserShippingList(): Observable<Response> {
    const url = this.serverPath + '/userShipping/list';

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers: tokenHeader});
  }

  public removeUserShipping(id: number): Observable<Response> {
    const url = this.serverPath + '/userShipping/' + id;

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, id, {headers: tokenHeader});
  }

  public setDefaultUserShipping(id: number): Observable<Response> {
    const url = this.serverPath + '/userShipping/setDefault';

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, id, {headers: tokenHeader});
  }
}
