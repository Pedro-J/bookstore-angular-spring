import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule
  ],
  declarations: [
    HomeComponent,
    NavBarComponent
  ],
  exports: [
    NavBarComponent
  ]
})
export class CoreModule { }
