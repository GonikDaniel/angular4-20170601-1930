import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import {UserService} from "../user.service";

import 'rxjs/add/operator/pluck'
import {Observable} from "rxjs/Observable";
import {User} from "../user.model";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  user: User | {};
  private sub;

  constructor(private _router: ActivatedRoute, private _userSrv: UserService) {
    this.user = {};
  }

  ngOnInit() {
    this.sub = this._router.params.pluck('userId')
      .flatMap(userId => this._userSrv.getById(userId))
      .subscribe(user => {
        this.user = user
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
