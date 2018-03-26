import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {UserShipping} from '../user-shipping.model';
import {UserShippingService} from '../user-shipping.service';
import {AppMessage} from '../../utils/app-message';

@Component({
  selector: 'app-user-shipping-list',
  templateUrl: './user-shipping-list.component.html',
  styleUrls: ['./user-shipping-list.component.css']
})
export class UserShippingListComponent implements OnInit, OnDestroy {

  @Output() updateTabEvent = new EventEmitter<{tab?: number, message?: AppMessage}>();
  private _message = new AppMessage();

  private _userShippingList: UserShipping[] = [];
  private _defaultShippingId = 0;

  constructor(private userShippingService: UserShippingService) { }

  ngOnInit(): void {
    this.userShippingService.getUserShippingList().subscribe(
      res => {
        this._userShippingList = res.json();

        for (const index in this._userShippingList) {
          if ( this._userShippingList[index].default ) {
            this._defaultShippingId = this._userShippingList[index].id;
            break;
          }
        }
      },
      error => {
        console.log('Error on loading payments');
      }
    );

    this.userShippingService.shippingListSubject.subscribe(
      (shipping: UserShipping) => {
        this._userShippingList.push(shipping);
    });
  }

  ngOnDestroy(): void {
    this.userShippingService.shippingListSubject.unsubscribe();
  }

  public onAddNew(): boolean {
    this.userShippingService.shippingSelectSubject.next(new UserShipping());
    this.updateTabEvent.emit({tab: 1});
    return false;
  }

  public onUpdateShipping(shipping: UserShipping): void {
    this.updateTabEvent.emit({tab: 1});
    this.userShippingService.shippingSelectSubject.next(shipping);
  }

  public onRemoveShipping(shipping: UserShipping): void {
    if ( shipping.default ) {
      this._message = AppMessage.createMessage('Default userShipping cannot be removed', '', 'danger',  true);
      this.updateTabEvent.emit({message: this._message});
    }else {
      this.userShippingService.removeUserShipping(shipping.id).subscribe(
        res => {
          const index = this._userShippingList.findIndex(current => current.id === shipping.id);
          this._userShippingList.splice(index, 1);

          this._message = AppMessage.createMessage('UserShipping was removed successfully', '', 'success', true);
          this.updateTabEvent.emit({message: this._message});
        },
        error => {
          console.log(error.text());
        }
      );
    }
  }

  setDefaultShipping() {
    this.userShippingService.setDefaultUserShipping(this._defaultShippingId).subscribe(
      res => {

        const defaultShipping = this._userShippingList.find(current => current.id === this._defaultShippingId );
        defaultShipping.default = true;

        this._message = AppMessage.createMessage('UserShipping set as default successfully', '', 'success', true);
        this.updateTabEvent.emit({message: this._message});
      },
      error => {
        console.log(error.text());
      }
    );
  }

  get userShippingList(): UserShipping[] {
    return this._userShippingList;
  }

  set userShippingList(value: UserShipping[]) {
    this._userShippingList = value;
  }

  get defaultShippingId(): number {
    return this._defaultShippingId;
  }

  set defaultShippingId(value: number) {
    this._defaultShippingId = value;
  }
}
