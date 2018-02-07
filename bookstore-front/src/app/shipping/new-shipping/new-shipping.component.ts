import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ShippingService} from '../shipping.service';
import {Shipping} from '../shipping.model';
import {AppMessage} from '../../utils/app-message';
import { AppConst } from '../../constants/app-const';

@Component({
  selector: 'app-new-shipping',
  templateUrl: './new-shipping.component.html',
  styleUrls: ['./new-shipping.component.css']
})
export class NewShippingComponent implements OnInit, OnDestroy {

  @Output() updateTabEvent = new EventEmitter<{tab?: number, message?: AppMessage}>();

  private _stateList: {label: string, value: string}[];
  private _shipping: Shipping = new Shipping();
  private _message: AppMessage = new AppMessage();

  constructor(private shippingService: ShippingService) { }

  ngOnInit() {
    this._stateList = AppConst.states;

    this.shippingService.shippingSelectSubject.subscribe(
      (shipping: Shipping) => {
        this._shipping = shipping;
      }
    );
  }

  ngOnDestroy(): void {
    this.shippingService.shippingSelectSubject.unsubscribe();
  }

  public onSubmit(): void{
    if ( this._shipping.id ) {
      this.onUpdateShipping();
    }else {
      this.onNewShipping();
    }
  }

  public onNewShipping(): void {
    this.shippingService.newShipping(this._shipping).subscribe(
      res => {
        this._shipping = res.json();
        this.shippingService.shippingListSubject.next(this._shipping);
        this._message = AppMessage.createMessage('Shipping was saved sucessfully.', '', 'success', true);
        this.updateTabEvent.emit({tab: 0, message: this._message});

        this._shipping = new Shipping();
      },
      error => {
        console.log(error.text());
      }
    );
  }

  public onUpdateShipping(): void {
    this.shippingService.updateShipping(this._shipping).subscribe(
      res => {
        this._message = AppMessage.createMessage('Shipping was updated sucessfully.', '', 'success', true);
        this.updateTabEvent.emit({tab: 0, message: this._message});
        this._shipping = new Shipping();
      },
      error => {
        console.log(error.text());
      }
    );
  }

  get shipping(): Shipping {
    return this._shipping;
  }

  set shipping(value: Shipping) {
    this._shipping = value;
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
