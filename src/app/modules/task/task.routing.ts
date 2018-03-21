import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskComponent } from './components/task/task.component';
import { AddEditTaskComponent } from './components/task/add-edit/add-edit.component';

const routes: Routes = [
  { path: 'task', children: [
    { path: 'list', component: TaskComponent },
    { path: 'add-edit', component: AddEditTaskComponent },
    { path: 'add-edit/:id', component: AddEditTaskComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
