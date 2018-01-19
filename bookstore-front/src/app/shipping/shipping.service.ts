import { Injectable } from '@angular/core';
import { AppConst } from '../constants/app-const';
import { Http, Headers, Response } from '@angular/http';
import { Shipping } from './shipping';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShippingService {

  private serverPath: string = AppConst.FULL_API_BASE_PATH;

  constructor(private http: Http) { }

  public newShipping(shipping: Shipping): Observable<Response> {
    const url = this.serverPath + '/shipping/add';

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(shipping), {headers: tokenHeader});
  }

  public getShippingList(): Observable<Response> {
    const url = this.serverPath + '/shipping/getUserShippingList';

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers: tokenHeader});
  }

  public removeShipping(id: number): Observable<Response> {
    const url = this.serverPath + '/shipping/' + id;

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, id, {headers: tokenHeader});
  }

  public setDefaultShipping(id: number): Observable<Response> {
    const url = this.serverPath + '/shipping/setDefault';

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, id, {headers: tokenHeader});
  }
}
