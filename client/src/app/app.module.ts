import { CheckoutModule } from './checkout/checkout.module';
import { BasketModule } from './basket/basket.module';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { ErrorInterceptorInterceptor } from './core/interceptors/error-interceptor.interceptor';
import { HomeModule } from './home/home.module';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgxSpinnerModule} from "ngx-spinner";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    HomeModule,
    NgxSpinnerModule,
    BasketModule,
    CheckoutModule
  ],
  providers: [{provide : HTTP_INTERCEPTORS, useClass : ErrorInterceptorInterceptor,multi:true},
              {provide : HTTP_INTERCEPTORS, useClass : LoadingInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
