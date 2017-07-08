import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SexPipe } from './sex.pipe';
import { UserCardComponent } from './user-card/user-card.component';
import { LogClickDirective } from './log-click.directive';

@NgModule({
  declarations: [
    AppComponent,
    SexPipe,
    UserCardComponent,
    LogClickDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
