import {Route} from "@angular/router";

import { MailBoxComponent } from './mail-box/mail-box.component'
import { UserListComponent } from './users/user-list/user-list.component'
import { WikiSearchComponent } from "./search/wiki-search/wiki-search.component";
import {UserDetailsComponent} from "./users/user-details/user-details.component";

export const routes: Route[] = [
  {
    path: '',
    component: MailBoxComponent
  },
  {
    path: 'users',
    component: UserListComponent,
    // children: [
    //
    // ]
  },
  {
    path: 'users/:userId',
    component: UserDetailsComponent,

  },
  {
    path: 'wiki-search',
    component: WikiSearchComponent
  }
];
