import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import 'hammerjs';

import { MaterialModule } from './modules/material.module';
import { UtilsModule } from './utils/utils.module';
import { routing } from './app.routing';

import { LoginService } from './services/login.service';
import { BookService } from './services/book.service';
import { UploadImageService } from './services/upload-image.service';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { ImgButtonComponent } from './components/img-button/img-button.component';
import { AddNewBookComponent } from './components/add-new-book/add-new-book.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { ViewBookComponent } from './components/view-book/view-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    ImgButtonComponent,
    AddNewBookComponent,
    BookListComponent,
    ViewBookComponent,
    EditBookComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    UtilsModule,
    routing
  ], entryComponents: [
    ConfirmDialogComponent
  ],
  providers: [
    LoginService,
    BookService,
    UploadImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
