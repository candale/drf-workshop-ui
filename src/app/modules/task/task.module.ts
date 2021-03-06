import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';
import { TaskRoutingModule } from './task.routing';
import { BoardComponent } from './components/board/board.component';
import { BoardHeaderComponent } from './components/board/board-header/board-header.component';
import { BoardItemComponent, MoveItemDialog } from './components/board/board-item/board-item.component';
import { TaskComponent } from './components/task/task.component';
import { Board } from '@core';
import { AddEditTaskComponent } from './components/task/add-edit/add-edit.component';
import { NewBoardComponent } from './components/board/new-board/new-board.component';
import { DrawerComponent, ChangeNameDialog } from './components/board/drawer/drawer.component';
import { DoneComponent } from './components/done/done.component';

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
    ChangeNameDialog,
    MoveItemDialog,
    DoneComponent,
  ],
  entryComponents: [
    DrawerComponent,
    ChangeNameDialog,
    MoveItemDialog,
  ]
})
export class TaskModule { }
