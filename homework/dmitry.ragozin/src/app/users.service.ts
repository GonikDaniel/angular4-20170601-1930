import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class UsersService {
  users;
  constructor() {
    this.users = [
      {name: 'Petr', surname: 'Ivanov', email: 'petr@mail.ru', id: 0},
      {name: 'Vladimir', surname: 'Kurnosov', email: 'vladimir@bk.ru',  id: 1},
      {name: 'Oleg', surname: 'Ruchkin', email: 'oleg@list.ru', id: 2},
      {name: 'Igor', surname: 'Lapshin', email: 'igor@list.ru', id: 2},
    ]
  }
  getAll() {
    return this.users;
  }
  getById(id: number) {
    return this.users[id];
  }
  setUser(id, user) { this.users[id] = user;
  }
  addUser(user) {this.users.push(user)}
  removeUser(id) {this.users.splice(id)};
  checkUniqueEmail(email) {
    return new Observable(observer => {
      setTimeout(() => {
        for (let i = 0; i < this.users.length; i++) {
          console.log(this.users[i].email);
          if (email === this.users[i].email) {
            observer.next({ 'checkUniqueEmail' : { error : 'unique false'} })
            observer.complete();
            return;
          }
        }
        observer.next(null);
        observer.next();
      }, 3000)
    });


  /*return Observable.fromPromise(new Promise(resolve => {
    setTimeout(() => {
      console.log(resolve);
      resolve (null);

    }, 3000)
  })); */

  }

}
