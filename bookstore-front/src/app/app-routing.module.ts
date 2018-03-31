import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { MyProfileComponent } from './user-account/my-profile/my-profile.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { BookDetailComponent } from './book/book-detail/book-detail.component';
import {ShoppingCart} from './shopping-cart/shopping-cart.model';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {OrderComponent} from './order/order.component';
import {OrderSummaryComponent} from './order/order-summary/order-summary.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'user/account', component: UserAccountComponent },
    { path: 'user/profile', component: MyProfileComponent },
    { path: 'book/list', component: BookListComponent },
    { path: 'book/:id', component: BookDetailComponent },
    { path: 'shoppingCart', component: ShoppingCartComponent },
    { path: 'checkout', component: OrderComponent },
    { path: 'orderSummary', component: OrderSummaryComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
