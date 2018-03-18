import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';
import { TaskRoutingModule } from './task.routing';
import { TaskComponent } from './components/task/task.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TaskRoutingModule,
  ],
  declarations: [TaskComponent]
})
export class TaskModule { }
