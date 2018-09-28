import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

const appRoutes: Routes = [
  /** replace with home or smth */
  { path: '', redirectTo: '/task/list', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes, { enableTracing: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
