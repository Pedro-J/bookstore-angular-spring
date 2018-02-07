import { Component, OnInit } from '@angular/core';
import {AppMessage} from '../utils/app-message';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

  message = new AppMessage();
  private _selectedShippingTab: number;

  constructor() { }

  ngOnInit(): void {
  }

  public selectedChange(val: number): void {
    this._selectedShippingTab = val;
  }

  public changeTab(val: {tab?: number, message?: AppMessage}) {
    if ( val.tab !== undefined ) {
      this._selectedShippingTab = val.tab;
    }

    if ( val.message ) {
      this.message = val.message;
    }
  }


  get selectedShippingTab(): number {
    return this._selectedShippingTab;
  }

  set selectedShippingTab(value: number) {
    this._selectedShippingTab = value;
  }
}
