import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {PaymentsComponent} from './payments.component';
import {NewPaymentComponent} from './new-payment/new-payment.component';
import {PaymentListComponent} from './payment-list/payment-list.component';
import {PaymentService} from './payment.service';
import {MaterialModule} from '../shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    PaymentsComponent,
    NewPaymentComponent,
    PaymentListComponent
  ],
  providers: [
    PaymentService
  ],
  exports: [
    PaymentsComponent
  ]
})
export class PaymentModule { }
