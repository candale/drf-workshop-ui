import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { BoardComponent } from './board/board.component';
import { BoardHeaderComponent } from './board/board-header/board-header.component';
import { BoardItemComponent } from './board/board-item/board-item.component';
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
    BoardComponent,
  ],
  declarations: [
    BoardComponent,
    BoardHeaderComponent,
    BoardItemComponent,
    NavComponent,
  ]
})
export class SharedModule { }
