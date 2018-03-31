import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../shared/material.module';
import {OrderService} from './order.service';
import {OrderComponent} from './order.component';
import {OrderSummaryComponent} from './order-summary/order-summary.component';
import {OrderListComponent} from './order-list/order-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    OrderComponent,
    OrderSummaryComponent,
    OrderListComponent
  ],
  providers: [OrderService]
})
export class OrderModule { }
