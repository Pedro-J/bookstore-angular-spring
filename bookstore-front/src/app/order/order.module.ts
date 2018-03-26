import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../shared/material.module';
import {OrderService} from './order.service';
import {OrderComponent} from './order.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [OrderComponent],
  providers: [OrderService]
})
export class OrderModule { }
