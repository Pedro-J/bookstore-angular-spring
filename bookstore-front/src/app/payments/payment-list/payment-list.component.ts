import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';
import { Payment } from '../payment';
import {Billing} from '../billing';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {

  private _payment: Payment;
  private _billing: Billing;
  private _paymentList: Payment[] = [];
  private _isDefaultPaymentSet = false;
  private _defaultPaymentId = 0;

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
    this.loadPayments();
  }

  private loadPayments(): void {
    this.paymentService.getPaymentList().subscribe(
      res => {
        this._paymentList = res.json();

        for (const index in this._paymentList) {
          if (this._paymentList[index].defaultPayment) {
            this._defaultPaymentId = this._paymentList[index].id;
            break;
          }
        }
      },
      error => {
        console.log('Error on loading payments');
      }
    );
  }

  public onUpdatePayment(payment: Payment) {
    this._payment = payment;
    this._billing = payment.userBilling;
    /*this.selectedBillingTab = 1;*/
  }

  public onDeletePayment(id: number) {
    this.paymentService.deletePayment(id).subscribe(
      res => {
        this.loadPayments();
      },
      error => {
        console.log(error.text());
      }
    );
  }

  public setDefaultPayment() {
    this._isDefaultPaymentSet = false;
    this.paymentService.setDefaultPayment(this._defaultPaymentId).subscribe(
      res => {
        this.loadPayments();
        this._isDefaultPaymentSet = true;
      },
      error => {
        console.log(error.text());
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

  get paymentList(): Payment[] {
    return this._paymentList;
  }

  set paymentList(value: Payment[]) {
    this._paymentList = value;
  }

  get isDefaultPaymentSet(): boolean {
    return this._isDefaultPaymentSet;
  }

  set isDefaultPaymentSet(value: boolean) {
    this._isDefaultPaymentSet = value;
  }

  get defaultPaymentId(): number {
    return this._defaultPaymentId;
  }

  set defaultPaymentId(value: number) {
    this._defaultPaymentId = value;
  }
}
