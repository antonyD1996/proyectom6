import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StandarRoutingModule } from './standar-routing.module';
import { ComerciosComponent } from './comercios/comercios.component';
import { IndexComponent } from './index/index.component';
import { AgregarComponent } from './agregar/agregar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComerciosComponent } from './admin-comercios/admin-comercios.component';


@NgModule({
  declarations: [
    ComerciosComponent,
    IndexComponent,
    AgregarComponent,
    AdminComerciosComponent
  ],
  imports: [
    CommonModule,
    StandarRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StandarModule { }
