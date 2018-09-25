import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskComponent } from './components/task/task.component';
import { AddEditTaskComponent } from './components/task/add-edit/add-edit.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { NewBoardComponent } from './components/board/new-board/new-board.component';
import { DoneComponent } from './components/done/done.component';

const routes: Routes = [
  { path: 'task', canActivate: [AuthGuard], children: [
    { path: 'new-board', component: NewBoardComponent },
    { path: 'list', component: TaskComponent },
    { path: 'add-edit', component: AddEditTaskComponent },
    { path: 'add-edit/:id', component: AddEditTaskComponent },
    { path: 'done', component: DoneComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
