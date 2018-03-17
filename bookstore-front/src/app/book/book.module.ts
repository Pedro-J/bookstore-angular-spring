import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BookListComponent} from './book-list/book-list.component';
import {BookService} from './book.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule } from '@angular/forms';
import { DataFilterPipe } from './data-filter.pipe';
import { BookDetailComponent } from './book-detail/book-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataTableModule,
    BrowserAnimationsModule
  ],
  declarations: [
    BookListComponent,
    DataFilterPipe,
    BookDetailComponent
  ],
  providers: [
    BookService
  ]
})
export class BookModule { }
