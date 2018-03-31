import {Component, OnInit} from '@angular/core';
import {AppMessage} from '../utils/app-message';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css']
})
export class UserPaymentComponent implements OnInit {

  private _message: AppMessage = new AppMessage();
  private _selectedPaymentTab: number;

  ngOnInit() {
    this._selectedPaymentTab = 0;
  }

  public selectedChange(val: number): void {
    this._selectedPaymentTab = val;
  }

  public changeTab(val: {tab: number, message?: AppMessage}): void {
    if ( val.tab !== undefined ) {
      this._selectedPaymentTab = val.tab;
    }

    if ( val.message ) {
      this._message = val.message;
    }
  }

  get selectedPaymentTab(): number {
    return this._selectedPaymentTab;
  }

  set selectedPaymentTab(value: number) {
    this._selectedPaymentTab = value;
  }

  get message(): AppMessage {
    return this._message;
  }

  set message(value: AppMessage) {
    this._message = value;
  }
}
