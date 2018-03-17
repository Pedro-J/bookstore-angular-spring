import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginService } from './user-account/login/login.service';
import { UserService } from './user-account/user.service';

import { CoreModule } from './core/core.module';
import { UserAccountModule } from './user-account/user-account.module';
import { MaterialModule } from './shared/material.module';
import { BookModule } from './book/book.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MaterialModule,
    AppRoutingModule,
    UserAccountModule,
    CoreModule,
    BookModule,
    ShoppingCartModule
  ],
  providers: [ LoginService, UserService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
