import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/distinctUntilChanged'

@Injectable()
export class SearchService {

  private searchTerm$$ = new BehaviorSubject('');

  constructor() { }

  setSearchTerm(value: string) {
    this.searchTerm$$.next(value);
  }

  getSearchTerm(): Observable<string> {
    return this.searchTerm$$.asObservable().distinctUntilChanged();
  }

}
