import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { User } from '../_models/user';

const users = [
  new User(0, 'admin', 'admin', '', '', ''),
  new User(1, 'root', '12345', '', '', '')
];

@Injectable()
export class AuthService {

  constructor(
     private _router: Router
  ) { }

  login(username, password) {
    const authenticatedUser = users.find(u => u.username === username);
    return Observable.create(observer => {
      let result;
      if (authenticatedUser && authenticatedUser.password === password){
        localStorage.setItem('user', authenticatedUser.username);
        observer.next(true);
      }
      observer.error('Wrong username or password!');

    });
  }

  register(model) {
    return Observable.create(observer => {
      const user = new User(
        users.length, // id
        model.username,
        model.password,
        model.firstName,
        model.surname,
        '' // country
      );
      users.push(user);
      observer.next(user);
    });
  }

  logout() {
    localStorage.removeItem('user');
    this._router.navigate(['/auth/login']);
  }

  get mockedUsers() {
    return users;
  }

  get isAuthorized() {
    return localStorage.getItem('user') !== null;
  }
}
