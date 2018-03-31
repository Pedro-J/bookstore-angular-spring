import { Component, OnInit } from '@angular/core';
import { AppConst } from '../../constants/app-const';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { CheckoutService } from '../checkout.service';
import { Order } from '../order.model';
import { ShoppingCartItem } from '../../shopping-cart/shopping-cart-item.model';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  private _serverPath = AppConst.FULL_API_BASE_PATH;
  private _order = new Order();
  private _estimatedDeliveryDate: string;
  private _cartItemList: ShoppingCartItem[] = [];

  constructor(
    private checkoutService: CheckoutService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this._order = JSON.parse(params['order']);
      const deliveryDate = new Date();

      if (this._order.shippingMethod === 'groundShipping') {
        deliveryDate.setDate(deliveryDate.getDate() + 5);
      } else {
        deliveryDate.setDate(deliveryDate.getDate() + 3);
      }
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      this._estimatedDeliveryDate = days[deliveryDate.getDay()] + ', ' + deliveryDate.getFullYear() +
        '/' + deliveryDate.getMonth() + '/' + deliveryDate.getDate();
      this._cartItemList = this._order.cartItemList;
    });
  }


  get order(): Order {
    return this._order;
  }

  set order(value: Order) {
    this._order = value;
  }

  get estimatedDeliveryDate(): string {
    return this._estimatedDeliveryDate;
  }

  set estimatedDeliveryDate(value: string) {
    this._estimatedDeliveryDate = value;
  }

  get cartItemList(): ShoppingCartItem[] {
    return this._cartItemList;
  }

  set cartItemList(value: ShoppingCartItem[]) {
    this._cartItemList = value;
  }

  get serverPath(): string {
    return this._serverPath;
  }

  set serverPath(value: string) {
    this._serverPath = value;
  }
}
