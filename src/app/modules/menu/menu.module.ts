import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';
import { MenuRoutingModule } from './menu.routing';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MenuRoutingModule,
  ],
  declarations: [MenuComponent]
})
export class MenuModule { }
