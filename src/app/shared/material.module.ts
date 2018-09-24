import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatCardModule,
  MatDividerModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSliderModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  DateAdapter,
  MatBottomSheetModule,
} from '@angular/material';
import { CustomDateAdapter } from './date-adapter/date-adapter';

@NgModule({
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatBottomSheetModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatBottomSheetModule,
  ],
})
export class MaterialModule { }
