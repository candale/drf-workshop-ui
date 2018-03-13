import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from './services/api/api.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ApiService],
})
export class CoreModule { }
