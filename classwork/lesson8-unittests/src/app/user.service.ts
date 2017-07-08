import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http:Http){}

  getOne(id: number) {
    return this.http.get(`/users/${id}`).map(result => result.json());
  }

  getAll() {
    return this.http.get(`/users`).map(result => result.json());
  }

}
