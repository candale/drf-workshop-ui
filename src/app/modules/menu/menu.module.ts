import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';
import { MenuRoutingModule } from './menu.routing';
import { MenuComponent } from './components/menu/menu.component';
import { InfoComponent } from './components/info/info.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MenuRoutingModule,
  ],
  declarations: [MenuComponent, InfoComponent]
})
export class MenuModule { }
