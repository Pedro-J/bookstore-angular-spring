import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShippingComponent } from './shipping.component';
import { ShippingListComponent } from './shipping-list/shipping-list.component';
import { NewShippingComponent } from './new-shipping/new-shipping.component';
import { ShippingService } from './shipping.service';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    ShippingComponent,
    ShippingListComponent,
    NewShippingComponent
  ],
  providers: [
    ShippingService
  ],
  exports: [
    ShippingComponent
  ]
})
export class ShippingModule { }
