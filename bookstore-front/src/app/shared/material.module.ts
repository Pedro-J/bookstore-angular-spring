import { NgModule } from '@angular/core';

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
  MatDialogModule
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
    MatDialogModule
  ]
})
export class MaterialModule {}