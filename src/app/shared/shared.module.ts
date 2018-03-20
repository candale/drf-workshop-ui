import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { NavComponent } from './nav/nav.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  exports: [
    BrowserAnimationsModule,
    MaterialModule,
    NavComponent,
  ],
  declarations: [
    NavComponent,
  ]
})
export class SharedModule { }
