import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { TaskModule } from './modules/task/task.module';
import { MenuModule } from './modules/menu/menu.module';
import { ListModule } from './modules/list/list.module';
import { AppComponent } from './app.component';
import { environment } from '@environment';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    /** CORE & SHARED */
    CoreModule,
    SharedModule,
    /** ROUTING */
    AppRoutingModule,
    /** MODULES */
    TaskModule,
    MenuModule,
    ListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
