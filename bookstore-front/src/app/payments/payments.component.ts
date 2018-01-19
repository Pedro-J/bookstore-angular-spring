import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  private _selectedTab = 0;

  constructor() { }

  ngOnInit() {
  }

  public selectedChange(val: number): void {
    this._selectedTab = val;
  }

  get selectedTab(): number {
    return this._selectedTab;
  }

  set selectedTab(value: number) {
    this._selectedTab = value;
  }
}
