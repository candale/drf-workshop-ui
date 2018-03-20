import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskComponent } from './components/task/task.component';
import { AddEditTaskComponent } from './components/task/add-edit/add-edit.component';

const routes: Routes = [
  { path: 'task', component: TaskComponent, children: [
    { path: ':id', component: AddEditTaskComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
