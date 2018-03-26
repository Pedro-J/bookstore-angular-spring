import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {UserShippingService} from '../user-shipping.service';
import {UserShipping} from '../user-shipping.model';
import {AppMessage} from '../../utils/app-message';
import { AppConst } from '../../constants/app-const';

@Component({
  selector: 'app-new-user-shipping',
  templateUrl: './new-user-shipping.component.html',
  styleUrls: ['./new-user-shipping.component.css']
})
export class NewUserShippingComponent implements OnInit, OnDestroy {

  @Output() updateTabEvent = new EventEmitter<{tab?: number, message?: AppMessage}>();

  private _stateList: {label: string, value: string}[];
  private _userShipping: UserShipping = new UserShipping();
  private _message: AppMessage = new AppMessage();

  constructor(private shippingService: UserShippingService) { }

  ngOnInit() {
    this._stateList = AppConst.states;

    this.shippingService.shippingSelectSubject.subscribe(
      (shipping: UserShipping) => {
        this._userShipping = shipping;
      }
    );
  }

  ngOnDestroy(): void {
    this.shippingService.shippingSelectSubject.unsubscribe();
  }

  public onSubmit(): void{
    if ( this._userShipping.id ) {
      this.onUpdateShipping();
    }else {
      this.onNewShipping();
    }
  }

  public onNewShipping(): void {
    this.shippingService.newUserShipping(this._userShipping).subscribe(
      res => {
        this._userShipping = res.json();
        this.shippingService.shippingListSubject.next(this._userShipping);
        this._message = AppMessage.createMessage('UserShipping was saved sucessfully.', '', 'success', true);
        this.updateTabEvent.emit({tab: 0, message: this._message});

        this._userShipping = new UserShipping();
      },
      error => {
        console.log(error.text());
      }
    );
  }

  public onUpdateShipping(): void {
    this.shippingService.updateUserShipping(this._userShipping).subscribe(
      res => {
        this._message = AppMessage.createMessage('UserShipping was updated sucessfully.', '', 'success', true);
        this.updateTabEvent.emit({tab: 0, message: this._message});
        this._userShipping = new UserShipping();
      },
      error => {
        console.log(error.text());
      }
    );
  }

  get userShipping(): UserShipping {
    return this._userShipping;
  }

  set userShipping(value: UserShipping) {
    this._userShipping = value;
  }

  get message(): AppMessage {
    return this._message;
  }

  set message(value: AppMessage) {
    this._message = value;
  }

  get stateList(): { label: string; value: string }[] {
    return this._stateList;
  }

  set stateList(value: { label: string; value: string }[]) {
    this._stateList = value;
  }
}
