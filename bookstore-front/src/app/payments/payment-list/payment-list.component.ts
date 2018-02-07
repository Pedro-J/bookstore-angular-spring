import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { PaymentService } from '../payment.service';
import { Payment } from '../payment.model';
import {AppMessage} from '../../utils/app-message';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit, OnDestroy {

  @Output() updateTabEvent = new EventEmitter<{tab?: number, message?: AppMessage}>();
  private _paymentList: Payment[] = [];
  private _payment: Payment;
  private _message: AppMessage = new AppMessage();
  private _defaultPaymentId = 0;

  constructor(private _paymentService: PaymentService) { }

  ngOnInit(): void {
    this._paymentService.getPaymentList().subscribe(
      res => {
        this._paymentList = res.json();
        for (const index in this._paymentList) {
          if (this._paymentList[index].default) {
            this._defaultPaymentId = this._paymentList[index].id;
            break;
          }
        }
      },
      error => {
        console.log('Error on loading payments');
      }
    );

    this._paymentService.paymentListSubject.subscribe(
      (newPayment: Payment) => {
        this._paymentList.push(newPayment);
      }
    );
  }

  ngOnDestroy(): void {
    this._paymentService.paymentListSubject.unsubscribe();
  }

  public onNew(): boolean {
    this._payment = new Payment();
    this.updateTabEvent.emit({tab: 1});

    return false;
  }

  public onUpdatePayment(payment: Payment) {
    this._payment = payment;
    this._paymentService.paymentSelectSubject.next(payment);

    this.updateTabEvent.emit({tab: 1});
  }

  public onDeletePayment(payment: Payment) {

    if ( payment.default ) {
      this._message = AppMessage.createMessage('Default payment cannot be removed.', '', 'danger', true);
      this.updateTabEvent.emit({message: this._message});
    }else {
      this._paymentService.deletePayment(payment.id).subscribe(
        res => {
          const index = this._paymentList.findIndex(current => current.id === payment.id);
          this._paymentList.splice(index, 1);

          this._message = AppMessage.createMessage('Payment was removed successfully!', '', 'success', true);
          this.updateTabEvent.emit({message: this._message});
        },
        error => {
          console.log(error.text());
        }
      );
    }

  }

  public setDefaultPayment() {
    this._paymentService.setDefaultPayment(this._defaultPaymentId).subscribe(
      res => {

        for (const payment of this._paymentList) {
          if ( payment.id === this.defaultPaymentId ) {
            payment.default = true;
          }else {
            payment.default = false;
          }
        }

        this._message = AppMessage.createMessage('Default payment set successfully!', '', 'success', true);
        this.updateTabEvent.emit({message: this._message});
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

  get defaultPaymentId(): number {
    return this._defaultPaymentId;
  }

  set defaultPaymentId(value: number) {
    this._defaultPaymentId = value;
  }

  get message(): AppMessage {
    return this._message;
  }

  set message(value: AppMessage) {
    this._message = value;
  }


  get paymentList(): Payment[] {
    return this._paymentList;
  }

  set paymentList(value: Payment[]) {
    this._paymentList = value;
  }
}
