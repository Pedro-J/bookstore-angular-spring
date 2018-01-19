import { Component, OnInit } from '@angular/core';
import {PaymentService} from '../payment.service';
import {Payment} from '../payment';
import {Billing} from '../billing';
import {AppMessage} from '../../utils/app-message';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements OnInit {

  private _payment: Payment = new Payment();
  private _billing: Billing = new Billing();
  private _message: AppMessage = new AppMessage();

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {

  }

  onNewPayment() {
    this.paymentService.newPayment(this._payment).subscribe(
      res => {
        /*this.selectedBillingTab = 0;*/
        this._message.text = 'New payment saved sucessfully.';
        this._message.show = true;
        this._payment = new Payment();
      },
      error => {
        console.log(error.text());
        this._message.text = error.text();
        this._message.show = true;
      }
    );
  }

  get payment(): Payment {
    return this._payment;
  }

  set payment(value: Payment) {
    this._payment = value;
  }

  get billing(): Billing {
    return this._billing;
  }

  set billing(value: Billing) {
    this._billing = value;
  }

  get message(): AppMessage {
    return this._message;
  }

  set message(value: AppMessage) {
    this._message = value;
  }
}
