import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Shipping} from '../shipping.model';
import {ShippingService} from '../shipping.service';
import {AppMessage} from '../../utils/app-message';

@Component({
  selector: 'app-shipping-list',
  templateUrl: './shipping-list.component.html',
  styleUrls: ['./shipping-list.component.css']
})
export class ShippingListComponent implements OnInit, OnDestroy {


  @Output() updateTabEvent = new EventEmitter<{tab?: number, message?: AppMessage}>();
  private _message = new AppMessage();

  private _shippingList: Shipping[] = [];
  private _defaultShippingId = 0;

  constructor(private shippingService: ShippingService) { }

  ngOnInit(): void {
    this.shippingService.getShippingList().subscribe(
      res => {
        this._shippingList = res.json();

        for (const index in this._shippingList) {
          if ( this._shippingList[index].default ) {
            this._defaultShippingId = this._shippingList[index].id;
            break;
          }
        }
      },
      error => {
        console.log('Error on loading payments');
      }
    );

    this.shippingService.shippingListSubject.subscribe(
      (shipping: Shipping) => {
        this._shippingList.push(shipping);
    });
  }

  ngOnDestroy(): void {
    this.shippingService.shippingListSubject.unsubscribe();
  }

  public onAddNew(): boolean {
    this.shippingService.shippingSelectSubject.next(new Shipping());
    this.updateTabEvent.emit({tab: 1});
    return false;
  }

  public onUpdateShipping(shipping: Shipping): void {
    this.updateTabEvent.emit({tab: 1});
    this.shippingService.shippingSelectSubject.next(shipping);
  }

  public onRemoveShipping(shipping: Shipping): void {
    if ( shipping.default ) {
      this._message = AppMessage.createMessage('Default shipping cannot be removed', '', 'danger',  true);
      this.updateTabEvent.emit({message: this._message});
    }else {
      this.shippingService.removeShipping(shipping.id).subscribe(
        res => {
          const index = this._shippingList.findIndex(current => current.id === shipping.id);
          this._shippingList.splice(index, 1);

          this._message = AppMessage.createMessage('Shipping was removed successfully', '', 'success', true);
          this.updateTabEvent.emit({message: this._message});
        },
        error => {
          console.log(error.text());
        }
      );
    }
  }

  setDefaultShipping() {
    this.shippingService.setDefaultShipping(this._defaultShippingId).subscribe(
      res => {

        const defaultShipping = this._shippingList.find( current => current.id === this._defaultShippingId );
        defaultShipping.default = true;

        this._message = AppMessage.createMessage('Shipping set as default successfully', '', 'success', true);
        this.updateTabEvent.emit({message: this._message});
      },
      error => {
        console.log(error.text());
      }
    );
  }

  get shippingList(): Shipping[] {
    return this._shippingList;
  }

  set shippingList(value: Shipping[]) {
    this._shippingList = value;
  }

  get defaultShippingId(): number {
    return this._defaultShippingId;
  }

  set defaultShippingId(value: number) {
    this._defaultShippingId = value;
  }
}
