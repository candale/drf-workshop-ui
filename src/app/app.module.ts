import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { AuthModule } from './modules/auth/auth.module';
import { TaskModule } from './modules/task/task.module';
import { MenuModule } from './modules/menu/menu.module';
import { ListModule } from './modules/list/list.module';
import { AppComponent } from './app.component';
import { environment } from '@environment';
import { CustomHammerConfig } from './hammerjs.config';


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
    AuthModule,
    TaskModule,
    MenuModule,
    ListModule,
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig, }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
