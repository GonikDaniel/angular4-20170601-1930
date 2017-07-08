import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: '<div>{{user?.name}}</div>',
})
export class UserCardComponent {

  public user;

  constructor(private _userService: UserService) { }

  someMethod() {
    this._userService.getOne(1).subscribe(user => this.user = user);
  }
}
