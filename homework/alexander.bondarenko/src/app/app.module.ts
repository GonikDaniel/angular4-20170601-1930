import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, JsonpModule } from "@angular/http";
import { ReactiveFormsModule } from "@angular/forms";

import 'hammerjs';

import { AppComponent } from './app.component';

import {
  MdButtonModule,
  MdListModule,
  MdGridListModule,
  MdMenuModule,
  MdInputModule
} from "@angular/material";

import { MailService } from "./mail-box/mail.service";
import { TimeAgoModule } from "./time-ago/time-ago.module";
import { SearchModule } from "./search/search.module";
import { MailBoxModule } from "./mail-box/mail-box.module";
import { UsersModule } from './users/users.module';
import { UserService } from './users/user.service';
import { CurrencyModule } from './currency/currency.module';
import {routes} from "./app.routes";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    BrowserAnimationsModule,
    MdButtonModule, MdListModule, MdGridListModule, MdMenuModule, MdInputModule,
    MailBoxModule,
    TimeAgoModule,
    UsersModule,
    CurrencyModule,
    SearchModule,
    RouterModule.forRoot(routes)
  ],
  exports: [],
  providers: [
    MailService,
    {
      provide: 'LEARN_JS_USERS_API_ENDPOINT',
      useValue: 'https://learn.javascript.ru/courses/groups/api/participants?key=1fxf2pg'
    },
    UserService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
