import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserPaymentComponent } from './user-payment.component';
import { NewUserPaymentComponent } from './new-user-payment/new-user-payment.component';
import { UserPaymentListComponent } from './user-payment-list/user-payment-list.component';
import { UserPaymentService } from './user-payment.service';
import {MaterialModule} from '../shared/material.module';
import {MessageModule} from '../shared/message/message.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MessageModule
  ],
  declarations: [
    UserPaymentComponent,
    NewUserPaymentComponent,
    UserPaymentListComponent
  ],
  providers: [
    UserPaymentService
  ],
  exports: [
    UserPaymentComponent
  ]
})
export class UserPaymentModule { }
