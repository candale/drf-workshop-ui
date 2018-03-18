import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatCardModule,
  MatDividerModule,
  MatSnackBarModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule,
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule,
  ],
})
export class MaterialModule { }
