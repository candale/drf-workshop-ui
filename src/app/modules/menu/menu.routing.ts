import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './components/menu/menu.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { InfoComponent } from './components/info/info.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'menu-info', component: InfoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
