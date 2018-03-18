import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {AppConst} from '../constants/app-const';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {
  private serverPath: string = AppConst.FULL_API_BASE_PATH;

  constructor(private http: Http) { }

  addItem(id: number, qty: number): Observable<Response> {
    const url = this.serverPath + '/cart/add';
    const cartItemInfo = {
      'bookId' : id,
      'qty' : qty
    };
    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, cartItemInfo, {headers: tokenHeader});
  }

  getCartItemList(): Observable<Response> {
    const url = this.serverPath + '/cart/getCartItemList';

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, {headers: tokenHeader});
  }

  getShoppingCart(): Observable<Response> {
    const url = this.serverPath + '/cart';

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, {headers: tokenHeader});
  }

  updateCartItem(cartItemId: number, qty: number): Observable<Response> {
    const url = this.serverPath + '/cart/update';
    const cartItemInfo = {
      'cartItemId' : cartItemId,
      'qty' : qty
    };
    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.put(url, cartItemInfo, {headers: tokenHeader});
  }

  removeCartItem(id: number): Observable<Response> {
    const url = this.serverPath + '/cart/item/' + id ;

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.delete(url, {headers: tokenHeader});
  }

}
