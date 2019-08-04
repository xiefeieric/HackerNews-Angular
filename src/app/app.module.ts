import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialSharedModule} from './material-shared/material-shared.module';
import { HeaderComponent } from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import { NewsViewComponent } from './news/news-view/news-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    HeaderComponent,
    NewsViewComponent
  ],
  imports: [
    BrowserModule,
    MaterialSharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
