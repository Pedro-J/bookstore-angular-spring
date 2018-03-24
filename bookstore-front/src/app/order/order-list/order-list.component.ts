import { Component, OnInit } from '@angular/core';
import {Order} from '../order.model';
import {OrderService} from '../order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  private _orderList: Order[] = [];
  private _order: Order = new Order();
  private _displayOrderDetail: boolean;

  constructor(private orderService: OrderService,
              private router: Router) {}

  ngOnInit(): void {

    this.orderService.getOrderList().subscribe(
      res => {
        this._orderList = res.json();
      },
      error => {
        console.log(error.text());
      }
    );
  }

  public onDisplayOrder(order: Order) {
    console.log(order);
    this._order = order;
    this._displayOrderDetail = true;
  }


  get orderList(): Order[] {
    return this._orderList;
  }

  set orderList(value: Order[]) {
    this._orderList = value;
  }

  get order(): Order {
    return this._order;
  }

  set order(value: Order) {
    this._order = value;
  }

  get displayOrderDetail(): boolean {
    return this._displayOrderDetail;
  }

  set displayOrderDetail(value: boolean) {
    this._displayOrderDetail = value;
  }
}
