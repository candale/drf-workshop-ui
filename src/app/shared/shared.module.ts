import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';
import { BoardComponent } from './board/board.component';
import { BoardHeaderComponent } from './board/board-header/board-header.component';
import { BoardBodyComponent } from './board/board-body/board-body.component';
import { ItemComponent } from './item/item.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
  ],
  declarations: [
    BoardComponent,
    BoardHeaderComponent,
    BoardBodyComponent,
    ItemComponent,
    NavComponent,
  ]
})
export class SharedModule { }
