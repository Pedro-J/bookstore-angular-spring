import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { UserAccountComponent } from './user-account.component';
import { MaterialModule } from '../shared/material.module';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { UserPaymentModule } from '../user-payment/user-payment.module';
import { UserShippingModule } from '../user-shipping/user-shipping.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    UserPaymentModule,
    UserShippingModule
  ],
  declarations: [
    LoginComponent,
    ForgetPasswordComponent,
    MyProfileComponent,
    NewAccountComponent,
    UserAccountComponent,
    AccountEditComponent
  ]
})
export class UserAccountModule { }
