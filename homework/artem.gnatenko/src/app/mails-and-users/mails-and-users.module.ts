import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModule } from '../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MailsAndUsersComponent } from './mails-and-users.component';
import { TimeElapsedPipe } from '../pipes/time-elapsed/time-elapsed.pipe';
import { CountryfromISOPipe } from '../pipes/country-from-iso/countryfrom-iso.pipe';

import { MailBoxComponent } from './mail-box/mail-box.component';
import { MailComponent } from './mail-box/mail/mail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserCardComponent } from './user-list/user-card/user-card.component';
import { UsersService } from './user-list/users.service';
import { mailsAndUsersRouting } from './mails-and-users.routing';
import { MailPageComponent } from './mail-page/mail-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ValidatorsModule } from '../validators/validators.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidatorsModule,
    mailsAndUsersRouting
  ],
  declarations: [
    MailsAndUsersComponent,
    MailBoxComponent,
    MailComponent,
    UserListComponent,
    UserCardComponent,
    TimeElapsedPipe,
    CountryfromISOPipe,
    MailPageComponent,
    UserPageComponent,
    EditUserComponent
  ],
  providers: [
    UsersService
  ]
})
export class MailsAndUsersModule { }
