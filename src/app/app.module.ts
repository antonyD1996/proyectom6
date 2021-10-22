import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';

import { AngularToastifyModule, ToastService } from 'angular-toastify';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [


    BrowserModule,
    AppRoutingModule,
    AuthModule,
    CommonModule,
    AngularToastifyModule
  ],
  providers: [ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
