import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';
import { ListRoutingModule } from './list.routing';
import { ListComponent } from './components/list/list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ListRoutingModule,
  ],
  declarations: [ListComponent]
})
export class ListModule { }
