import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { countries } from '../../_data/countries';

@Injectable()
export class ContactsService {

  private _contacts = [];
  constructor(private http: Http) {
    if (!this._contacts.length) {
      this._fetchData();
    }
  }

  getUsers() {
    return this._contacts.length
      ? this._getFromCache()
      : this._fetchData();
  }

  getUserById(id) {
    return this._getFromCacheById(id);
  }

  getCountries() {
    return countries.map(country => country.code);
  }

  saveContact(contact) {
    return Observable.create(observer => {
      const index = this._contacts.findIndex(item => item.id === contact.id);
      if (index !== -1) {
        this._contacts[index] = contact;
        observer.next(contact);
        observer.complete();
      } else {
        observer.error({ error: 'wrong index' });
        observer.complete();
      }
    });
  }

  isEmailUnique(email, id = null) {
    return !this._contacts.find(contact => contact.email === email && contact.id !== id);
  }

  isUsernameUnique(username) {
    return !this._contacts.find(contact => contact.username === username);
  }

  _getFromCache() {
    return Observable.create(observer => {
      observer.next(this._contacts);
      observer.complete();
    });
  }

  _fetchData() {
    return this.http.get('https://learn.javascript.ru/courses/groups/api/participants?key=1fxf2pg')
      .map(response => {
        this._contacts = response.json();
        this._contacts.forEach((user, index) => {
          user.id = index;
          user.email = `test${index}@email.com`;
        });
        return Object.assign([], this._contacts);
      });
  }

  private _getFromCacheById(id) {
    return Observable.create(observer => {
      if (this._contacts.length) {
        const cached = this._contacts.find(user => user.id === id);
        observer.next(cached);
        observer.complete();
      } else {
        const user = this._fetchData()
          .subscribe(users => {
            const user = users.find((user: any) => user.id === id);
            observer.next(user);
            observer.complete();
          });
      }
    })
  }

}
