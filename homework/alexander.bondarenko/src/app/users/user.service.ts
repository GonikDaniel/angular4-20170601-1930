import { Injectable, Inject } from '@angular/core';
import  { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/distinctUntilChanged'

import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {User} from "./user.model";

@Injectable()
export class UserService {

  private _users: User[];
  private _users$$: BehaviorSubject<User[]>;

  constructor(@Inject('LEARN_JS_USERS_API_ENDPOINT') private API_URL: string, private _http: Http) {
    this._users = [];
    this._users$$ = new BehaviorSubject(this._users);
  }

  private fetchUsers() {
    return this._http.get(this.API_URL).map(response =>response.json()).do(users => {
      this._users = users;
      this._users$$.next(this._users);
    })
  }

  getAll(){
    return this.fetchUsers().flatMap(() => this._users$$.asObservable().distinctUntilChanged());
  }

  getById(id) {
    return this.getAll().map(users => users[id]);
  }
}
