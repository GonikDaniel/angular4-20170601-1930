import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AuthService } from '../../auth/auth.service';
import { countries } from '../../_data/countries';

@Injectable()
export class ContactsService {

  private contacts = [];
  constructor(
    private http: Http,
    private authService: AuthService
  ) {
    if (!this.contacts.length) {
      this.fetchData();
    }
  }

  public getCountries() {
    return countries.map(country => country.code);
  }

  public getUserById(id) {
    return this.getFromCacheById(id);
  }

  public getUsers() {
    return this.contacts.length
      ? this.getFromCache()
      : this.fetchData();
  }

  public isEmailUnique(email, id = null) {
    return !this.contacts.find(contact => contact.email === email && contact.id !== id);
  }

  public isUsernameUnique(username) {
    return !this.authService.mockedUsers.find(user => user.username === username);
  }

  public saveContact(contact) {
    return Observable.create(observer => {
      const index = this.contacts.findIndex(item => item.id === contact.id);
      if (index !== -1) {
        this.contacts[index] = contact;
        observer.next(contact);
        observer.complete();
      } else {
        observer.error({ error: 'wrong index' });
        observer.complete();
      }
    });
  }

  private getFromCache() {
    return Observable.create(observer => {
      observer.next(this.contacts);
      observer.complete();
    });
  }

  private fetchData() {
    return this.http.get('https://learn.javascript.ru/courses/groups/api/participants?key=1fxf2pg')
      .map(response => {
        this.contacts = response.json();
        this.contacts.forEach((user, index) => {
          user.id = index;
          user.email = `test${index}@email.com`;
        });
        return Object.assign([], this.contacts);
      });
  }

  private getFromCacheById(id) {
    return Observable.create(observer => {
      if (this.contacts.length) {
        const cached = this.contacts.find(user => user.id === id);
        observer.next(cached);
        observer.complete();
      } else {
        const user = this.fetchData()
          .subscribe(users => {
            const user = users.find((user: any) => user.id === id);
            observer.next(user);
            observer.complete();
          });
      }
    })
  }

}
