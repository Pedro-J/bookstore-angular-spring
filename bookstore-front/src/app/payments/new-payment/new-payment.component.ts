import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { PaymentService } from '../payment.service';
import { Payment } from '../payment.model';
import { Billing } from '../billing.model';
import { AppMessage } from '../../utils/app-message';
import { AppConst } from '../../constants/app-const';


@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements OnInit, OnDestroy {

  @Output() updateTabEvent = new EventEmitter<{tab: number, message?: AppMessage}>();

  private _payment: Payment = new Payment();
  private _billing: Billing = new Billing();
  private _message: AppMessage = new AppMessage();
  private _stateList: {value: string, label: string}[] = [];

  constructor(private _paymentService: PaymentService) { }

  ngOnInit(): void {
    this._stateList = AppConst.states;

    this._paymentService.paymentSelectSubject.subscribe(
      (selectedPayment: Payment) => {
        this._payment = selectedPayment;
        this._billing = selectedPayment.userBilling;
      }
    );
  }

  ngOnDestroy(): void {
    this._paymentService.paymentSelectSubject.unsubscribe();
  }

  public onSubmit(): void {
    if ( this._payment.id ) {
      this.onUpdatePayment();
    }else {
      this.onNewPayment();
    }
  }

  public onNewPayment(): void {
    this._payment.userBilling = this._billing;
    this._paymentService.newPayment(this._payment).subscribe(
      res => {
        this._payment = res.json();
        this._paymentService.paymentListSubject.next(this._payment);

        this._message = AppMessage.createMessage('Payment was saved successfully!', '', 'success', true);
        this.updateTabEvent.emit({tab: 0, message: this._message});

        this._payment = new Payment();
        this._billing = new Billing();
      },
      error => {
        console.log(error.text());
        this._message = AppMessage.createMessage(error.text(), '', 'error', true);
      }
    );
  }

  public onUpdatePayment(): void {
    this._paymentService.updatePayment(this._payment).subscribe(
      res => {

        this._message = AppMessage.createMessage('Payment was updated successfully!', '', 'success', true);
        this.updateTabEvent.emit({tab: 0, message: this._message});

        this._payment = new Payment();
        this._billing = new Billing();
      },
      error => {
        console.log(error.text());
        this._message = AppMessage.createMessage(error.text(), '', 'error', true);
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

  get stateList(): { value: string; label: string }[] {
    return this._stateList;
  }

  set stateList(value: { value: string; label: string }[]) {
    this._stateList = value;
  }
}
