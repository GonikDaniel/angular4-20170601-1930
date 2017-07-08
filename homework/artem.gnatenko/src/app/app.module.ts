import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { CurrencyConverterService } from './currency-converter/currency-converter.service';
import { SearchComponent } from './search/search.component';
import { WikiSearchComponent } from './search/wiki-search/wiki-search.component';
import { SearchService } from './search/search.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyConverterComponent,
    SearchComponent,
    WikiSearchComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { 
        path: 'mails-and-users', 
        loadChildren: 'app/mails-and-users/mails-and-users.module#MailsAndUsersModule', 
        canActivate: [AuthGuard]
      }
    ])
  ],
  providers: [
    CurrencyConverterService,
    SearchService,
    LoginService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }