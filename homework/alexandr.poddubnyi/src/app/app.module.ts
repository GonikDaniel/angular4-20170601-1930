import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MailboxModule } from 'app/mailbox/mailbox.module';
import { AppRoutingModule } from 'app/app-routing.module';
import { UsersCurrencyModule } from 'app/users-currency/users-currency.module';
import { WikiRxSearchModule } from 'app/wiki-rx-search/wiki-rx-search.module';
import { UsersRoutingModule } from 'app/users-routing/users-routing.module';
import { UserComponent } from './users-routing/users/user/user.component';
import { EmailComponent } from './users-routing/emails/email/email.component';
import { LoginComponent } from './users-routing/login/login.component';
import { FormsLessonModule } from 'app/forms-lesson/forms-lesson.module';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    EmailComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,

    MailboxModule,
    UsersCurrencyModule,
    WikiRxSearchModule,
    UsersRoutingModule,
    FormsLessonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
