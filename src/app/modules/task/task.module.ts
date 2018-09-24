import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';
import { TaskRoutingModule } from './task.routing';
import { BoardComponent } from './components/board/board.component';
import { BoardHeaderComponent } from './components/board/board-header/board-header.component';
import { BoardItemComponent } from './components/board/board-item/board-item.component';
import { TaskComponent } from './components/task/task.component';
import { Board } from '@core';
import { AddEditTaskComponent } from './components/task/add-edit/add-edit.component';
import { NewBoardComponent } from './components/board/new-board/new-board.component';
import { DrawerComponent } from './components/board/drawer/drawer.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TaskRoutingModule,
  ],
  declarations: [
    BoardComponent,
    BoardHeaderComponent,
    BoardItemComponent,
    TaskComponent,
    AddEditTaskComponent,
    NewBoardComponent,
    DrawerComponent,
  ],
  entryComponents: [
    DrawerComponent,
  ]
})
export class TaskModule { }
