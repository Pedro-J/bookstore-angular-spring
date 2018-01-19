import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {LoginService} from './user-account/login/login.service';
import {UserService} from './user-account/user.service';

import {CoreModule} from './core/core.module';
import {UserAccountModule} from './user-account/user-account.module';
import {MaterialModule} from './shared/material.module';
import { NewPaymentComponent } from './payments/new-payment/new-payment.component';
import { PaymentListComponent } from './payments/payment-list/payment-list.component';
import { PaymentsComponent } from './payments/payments.component';
import { ShippingComponent } from './shipping/shipping.component';
import { NewShippingComponent } from './shipping/new-shipping/new-shipping.component';
import { ShippingEditComponent } from './shipping/shipping-edit/shipping-edit.component';
import { ShippingListComponent } from './shipping/shipping-list/shipping-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NewPaymentComponent,
    PaymentListComponent,
    PaymentsComponent,
    ShippingComponent,
    NewShippingComponent,
    ShippingEditComponent,
    ShippingListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MaterialModule,
    AppRoutingModule,
    UserAccountModule,
    CoreModule
  ],
  providers: [ LoginService, UserService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
