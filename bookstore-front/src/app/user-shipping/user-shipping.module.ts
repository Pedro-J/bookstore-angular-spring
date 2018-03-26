import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserShippingComponent } from './user-shipping.component';
import { UserShippingListComponent } from './user-shipping-list/user-shipping-list.component';
import { NewUserShippingComponent } from './new-user-shipping/new-user-shipping.component';
import { UserShippingService } from './user-shipping.service';
import { MaterialModule } from '../shared/material.module';
import {MessageModule} from '../shared/message/message.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MessageModule
  ],
  declarations: [
    UserShippingComponent,
    UserShippingListComponent,
    NewUserShippingComponent
  ],
  providers: [
    UserShippingService
  ],
  exports: [
    UserShippingComponent
  ]
})
export class UserShippingModule { }
