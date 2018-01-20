import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

  private _selectedShippingTab: number;

  constructor() { }

  ngOnInit() {
  }

  public selectedChange(val: number) {
    this._selectedShippingTab = val;
  }


  get selectedShippingTab(): number {
    return this._selectedShippingTab;
  }

  set selectedShippingTab(value: number) {
    this._selectedShippingTab = value;
  }
}
