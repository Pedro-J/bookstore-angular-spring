import { Component, OnInit } from '@angular/core';
import {Shipping} from '../shipping';
import {ShippingService} from '../shipping.service';
import {Payment} from '../../payments/payment';
import {Billing} from '../../payments/billing';
import {PaymentService} from '../../payments/payment.service';

@Component({
  selector: 'app-shipping-list',
  templateUrl: './shipping-list.component.html',
  styleUrls: ['./shipping-list.component.css']
})
export class ShippingListComponent implements OnInit {

  private _shipping: Shipping;
  private _shippingList: Shipping[] = [];
  private _isDefaultShippingSet = false;
  private _defaultShippingId = 0;

  constructor(private shippingService: ShippingService) { }

  ngOnInit() {
  }

  private loadShippingList(): void {
    this.shippingService.getShippingList().subscribe(
      res => {
        this._shippingList = res.json();

        for (const index in this._shippingList) {
          if ( this._shippingList[index].userShippingDefault ) {
            this._defaultShippingId = this._shippingList[index].id;
            break;
          }
        }
      },
      error => {
        console.log('Error on loading payments');
      }
    );
  }

  onUpdateShipping(shipping: Shipping) {
    this._shipping = shipping;
/*    this.selectedShippingTab = 1;*/
  }

  onRemoveShipping(id: number) {
    this.shippingService.removeShipping(id).subscribe(
      res => {
        this.loadShippingList();
      },
      error => {
        console.log(error.text());
      }
    );
  }

  setDefaultShipping() {
    this._isDefaultShippingSet = false;
    this.shippingService.setDefaultShipping(this._defaultShippingId).subscribe(
      res => {
        this.loadShippingList();
        this._isDefaultShippingSet = true;
      },
      error => {
        console.log(error.text());
      }
    );
  }
}
