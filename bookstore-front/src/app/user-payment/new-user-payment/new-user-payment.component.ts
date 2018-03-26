import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { UserPaymentService } from '../user-payment.service';
import { UserPayment } from '../user-payment.model';
import { UserBilling } from '../user-billing.model';
import { AppMessage } from '../../utils/app-message';
import { AppConst } from '../../constants/app-const';

@Component({
  selector: 'app-new-user-payment',
  templateUrl: './new-user-payment.component.html',
  styleUrls: ['./new-user-payment.component.css']
})
export class NewUserPaymentComponent implements OnInit, OnDestroy {

  @Output() updateTabEvent = new EventEmitter<{tab: number, message?: AppMessage}>();

  private _userPayment: UserPayment = new UserPayment();
  private _userBilling: UserBilling = new UserBilling();
  private _message: AppMessage = new AppMessage();
  private _stateList: {value: string, label: string}[] = [];

  constructor(private userPaymentService: UserPaymentService) { }

  ngOnInit(): void {
    this._stateList = AppConst.states;

    this.userPaymentService.paymentSelectSubject.subscribe(
      (selectedPayment: UserPayment) => {
        this._userPayment = selectedPayment;
        this._userBilling = selectedPayment.userBilling;
      }
    );
  }

  ngOnDestroy(): void {
    this.userPaymentService.paymentSelectSubject.unsubscribe();
  }

  public onSubmit(): void {
    if ( this._userPayment.id ) {
      this.onUpdatePayment();
    }else {
      this.onNewPayment();
    }
  }

  public onNewPayment(): void {
    this._userPayment.userBilling = this._userBilling;
    this.userPaymentService.newUserPayment(this._userPayment).subscribe(
      res => {
        this._userPayment = res.json();
        this.userPaymentService.paymentListSubject.next(this._userPayment);

        this._message = AppMessage.createMessage('UserPayment was saved successfully!', '', 'success', true);
        this.updateTabEvent.emit({tab: 0, message: this._message});

        this._userPayment = new UserPayment();
        this._userBilling = new UserBilling();
      },
      error => {
        console.log(error.text());
        this._message = AppMessage.createMessage(error.text(), '', 'error', true);
      }
    );
  }

  public onUpdatePayment(): void {
    this.userPaymentService.updateUserPayment(this._userPayment).subscribe(
      res => {

        this._message = AppMessage.createMessage('UserPayment was updated successfully!', '', 'success', true);
        this.updateTabEvent.emit({tab: 0, message: this._message});

        this._userPayment = new UserPayment();
        this._userBilling = new UserBilling();
      },
      error => {
        console.log(error.text());
        this._message = AppMessage.createMessage(error.text(), '', 'error', true);
      }
    );
  }

  get userPayment(): UserPayment {
    return this._userPayment;
  }

  set userPayment(value: UserPayment) {
    this._userPayment = value;
  }

  get userBilling(): UserBilling {
    return this._userBilling;
  }

  set userBilling(value: UserBilling) {
    this._userBilling = value;
  }

  get stateList(): { value: string; label: string }[] {
    return this._stateList;
  }

  set stateList(value: { value: string; label: string }[]) {
    this._stateList = value;
  }
}
