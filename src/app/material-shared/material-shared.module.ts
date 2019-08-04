import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule, MatIconModule,
  MatListModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSidenavModule
} from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class MaterialSharedModule { }
