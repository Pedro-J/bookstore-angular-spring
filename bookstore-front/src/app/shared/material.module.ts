import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatToolbarModule,
  MatInputModule,
  MatGridListModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatPaginatorModule,
  MatTableModule,
  MatDialogModule,
  MatTabsModule
} from '@angular/material';


@NgModule({
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatTabsModule,
    BrowserAnimationsModule
  ]
})
export class MaterialModule {}
