import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  private _selectedPaymentTab = 0;

  constructor() { }

  ngOnInit() {
  }

  public selectedChange(val: number): void {
    this._selectedPaymentTab = val;
  }

  get selectedPaymentTab(): number {
    return this._selectedPaymentTab;
  }

  set selectedPaymentTab(value: number) {
    this._selectedPaymentTab = value;
  }

}
