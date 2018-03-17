import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { MyProfileComponent } from './user-account/my-profile/my-profile.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { BookDetailComponent } from './book/book-detail/book-detail.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'user/account', component: UserAccountComponent },
    { path: 'user/profile', component: MyProfileComponent },
    { path: 'book/list', component: BookListComponent},
    { path: 'book/:id', component: BookDetailComponent}

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
