import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Payment} from '../payments/payment.model';
import {AppConst} from '../constants/app-const';
import {Billing} from '../payments/billing.model';
import {Shipping} from '../shipping/shipping.model';
import {Observable} from 'rxjs/Observable';
import {OrderShipping} from '../order/order-shipping.model';
import {OrderBilling} from '../order/order-billing.model';

@Injectable()
export class CheckoutService {

  private serverPath = AppConst.FULL_API_BASE_PATH;

  constructor(private http: Http) { }

  public checkout(orderShipping: OrderShipping, orderBilling: OrderBilling,
                  payment: Payment, shippingMethod: string): Observable<Response> {

    const url = this.serverPath + '/checkout/checkout';
    const order = {
      'shippingAddress' : orderShipping,
      'billingAddress' : orderBilling,
      'payment' : payment,
      'shippingMethod' : shippingMethod
    };

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, order, {headers: tokenHeader});
  }

  public getUserOrder(): Observable<Response> {
    const url = this.serverPath + '/checkout/getUserOrder';

    const tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, {headers: tokenHeader});
  }

}
