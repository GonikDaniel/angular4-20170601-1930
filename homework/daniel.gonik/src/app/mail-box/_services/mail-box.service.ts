import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MailBoxService {

  private cache;
  private emails: Array<any> = [];

  constructor(private http: Http) {
    this.cache = {
      posts: [],
      users: []
    };
  }

  getEmails() {
    return this.cache.posts.length
      ? this.getFromCache('posts')
      : this.fetchData('posts');
  }

  getAuthors() {
    return this.cache.users.length
      ? this.getFromCache('users')
      : this.fetchData('users');
  }

  getEmailById(id) {
    return this.cache.posts.length
      ? this.getFromCacheById('posts', id)
      : this.fetchDataById('posts', id);
  }

  getAuthorById(id) {
    return this.cache.users.length
      ? this.getFromCacheById('users', id)
      : this.fetchDataById('users', id);
  }

  private getFromCache(entity) {
    return Observable.create(observer => {
      const cached = Object.assign([], this.cache[entity]);
      observer.next(cached);
      observer.complete();
    });
  }

  private fetchData(entity) {
    return this.http.get(`https://jsonplaceholder.typicode.com/${entity}`)
      .map(response => {
        this.cache[entity] = response.json();
        return Object.assign([], this.cache[entity]);
      });
  }

  private getFromCacheById(entity, id) {
    return Observable.create(observer => {
      const cached = this.cache[entity].find(item => item.id === id);
      observer.next(cached);
      observer.complete();
    })
  }

  private fetchDataById(entity, id) {
    return this.http.get(`https://jsonplaceholder.typicode.com/${entity}/${id}`)
      .map(response => {
        const res = response.json();
        return Object.assign({}, res);
      });
  }

  private updateMailBox() {
    this.emails.push(...(this.cache.splice(0, 3)));
    const mark = setInterval(() => {
      this.cache.length
        ? this.emails.push(this.updateEmailDate(this.cache.pop()))
        : clearInterval(mark);
    }, 3000)
  }

  private updateEmailDate(email) {
    email.createdAt = Date.now();
    return email;
  }

}
