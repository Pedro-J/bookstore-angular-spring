import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShoppingCartComponent } from './shopping-cart.component';
import {ShoppingCartService} from './shopping-cart.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ShoppingCartComponent
  ],
  providers: [
    ShoppingCartService
  ]
})
export class ShoppingCartModule {}
