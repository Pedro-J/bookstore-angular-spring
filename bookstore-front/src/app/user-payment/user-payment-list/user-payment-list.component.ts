import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { UserPaymentService } from '../user-payment.service';
import { UserPayment } from '../user-payment.model';
import {AppMessage} from '../../utils/app-message';

@Component({
  selector: 'app-user-payment-list',
  templateUrl: './user-payment-list.component.html',
  styleUrls: ['./user-payment-list.component.css']
})
export class UserPaymentListComponent implements OnInit, OnDestroy {

  @Output() updateTabEvent = new EventEmitter<{tab?: number, message?: AppMessage}>();
  private _userPaymentList: UserPayment[] = [];
  private _userPayment: UserPayment;
  private _message: AppMessage = new AppMessage();
  private _defaultPaymentId = 0;

  constructor(private paymentService: UserPaymentService) { }

  ngOnInit(): void {
    this.paymentService.getUserPaymentList().subscribe(
      res => {
        this._userPaymentList = res.json();
        for (const index in this._userPaymentList) {
          if (this._userPaymentList[index].default) {
            this._defaultPaymentId = this._userPaymentList[index].id;
            break;
          }
        }
      },
      error => {
        console.log('Error on loading payments');
      }
    );

    this.paymentService.paymentListSubject.subscribe(
      (newPayment: UserPayment) => {
        this._userPaymentList.push(newPayment);
      }
    );
  }

  ngOnDestroy(): void {
    this.paymentService.paymentListSubject.unsubscribe();
  }

  public onNew(): boolean {
    this._userPayment = new UserPayment();
    this.updateTabEvent.emit({tab: 1});

    return false;
  }

  public onUpdatePayment(payment: UserPayment) {
    this._userPayment = payment;
    this.paymentService.paymentSelectSubject.next(payment);

    this.updateTabEvent.emit({tab: 1});
  }

  public onDeletePayment(payment: UserPayment) {

    if ( payment.default ) {
      this._message = AppMessage.createMessage('Default userPayment cannot be removed.', '', 'danger', true);
      this.updateTabEvent.emit({message: this._message});
    }else {
      this.paymentService.deleteUserPayment(payment.id).subscribe(
        res => {
          const index = this._userPaymentList.findIndex(current => current.id === payment.id);
          this._userPaymentList.splice(index, 1);

          this._message = AppMessage.createMessage('UserPayment was removed successfully!', '', 'success', true);
          this.updateTabEvent.emit({message: this._message});
        },
        error => {
          console.log(error.text());
        }
      );
    }

  }

  public setDefaultPayment() {
    this.paymentService.setDefaultUserPayment(this._defaultPaymentId).subscribe(
      res => {

        for (const payment of this._userPaymentList) {
          if ( payment.id === this.defaultPaymentId ) {
            payment.default = true;
          }else {
            payment.default = false;
          }
        }

        this._message = AppMessage.createMessage('Default userPayment set successfully!', '', 'success', true);
        this.updateTabEvent.emit({message: this._message});
      },
      error => {
        console.log(error.text());
      }
    );
  }

  get userPayment(): UserPayment {
    return this._userPayment;
  }

  set userPayment(value: UserPayment) {
    this._userPayment = value;
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


  get userPaymentList(): UserPayment[] {
    return this._userPaymentList;
  }

  set userPaymentList(value: UserPayment[]) {
    this._userPaymentList = value;
  }
}
