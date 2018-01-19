import { Component, OnInit } from '@angular/core';
import {ShippingService} from '../shipping.service';
import {Shipping} from '../shipping';
import {AppMessage} from '../../utils/app-message';

@Component({
  selector: 'app-new-shipping',
  templateUrl: './new-shipping.component.html',
  styleUrls: ['./new-shipping.component.css']
})
export class NewShippingComponent implements OnInit {

  private _shipping: Shipping = new Shipping();
  private _message: AppMessage = new AppMessage();

  constructor(private shippingService: ShippingService) { }

  ngOnInit() {
  }

  onNewShipping() {
    this.shippingService.newShipping(this._shipping).subscribe(
      res => {
        this._message.text = 'New shipping saved sucessfully.';
        this._message.show = true;
        this._shipping = new Shipping();

        // this.selectedShippingTab=0;
      },
      error => {
        console.log(error.text());
        this._message.text = error.text();
        this._message.show = true;
      }
    );
  }


  get shipping(): Shipping {
    return this._shipping;
  }

  set shipping(value: Shipping) {
    this._shipping = value;
  }

  get message(): AppMessage {
    return this._message;
  }

  set message(value: AppMessage) {
    this._message = value;
  }
}
