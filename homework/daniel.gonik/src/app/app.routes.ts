import { Route } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MailListComponent } from './mail-box/mail-list/mail-list.component';
import { MailViewComponent } from './mail-box/mail-view/mail-view.component';
import { ContactsComponent } from './mail-box/contacts/contacts.component';
import { ContactViewComponent } from './mail-box/contact-view/contact-view.component';
import { ContactEditComponent } from './mail-box/contact-edit/contact-edit.component';
import { WidgetComponent } from './wiki/widget/widget.component';
import { SettingsComponent } from './mail-box/settings/settings.component';

import { AuthGuard } from './_guards/auth.guard';

import { EmailsResolver } from './_resolves/emails.resolver';
import { AuthorsResolver } from './_resolves/authors.resolver';
import { ContactsResolver } from './_resolves/contacts.resolver';

export const routes: Route[] = [
  { path: '', redirectTo: '/app/inbox', pathMatch : 'full' },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login'
        },
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'Register'
        },
      }
    ]
  },
  {
    path: 'app',
    component: AuthComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/app/inbox', pathMatch: 'full' },
      {
        path: 'inbox',
        component: MailListComponent,
        resolve: {
          emails: EmailsResolver,
          authors: AuthorsResolver
        },
        data: {
          title: 'Inbox'
        },
        // canActivate: [AuthGuardService]
      },
      {
        path: 'emails/:emailId',
        component: MailViewComponent,
        data: {
          title: 'Email view'
        }
      },
      {
        path: 'contacts',
        children: [
          {
            path: '',
            component: ContactsComponent,
            resolve: {
              contacts: ContactsResolver
            },
            data: {
              title: 'Contacts list'
            }
          },
          {
            path: 'edit/:contactId',
            component: ContactEditComponent,
            data: {
              title: 'Contact view'
            }
          },
          {
            path: 'view/:contactId',
            component: ContactViewComponent,
            data: {
              title: 'Contact view'
            }
          }
        ]
      },
      {
        path: 'wiki',
        component: WidgetComponent,
        data: {
          title: 'Wiki'
        }
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: {
          title: 'Settings'
        }
      }
    ]
  },
  { path:'**', redirectTo: '/app', pathMatch : 'full' }
];

