import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StandarRoutingModule } from './standar-routing.module';
import { ComerciosComponent } from './comercios/comercios.component';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    ComerciosComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    StandarRoutingModule
  ]
})
export class StandarModule { }
