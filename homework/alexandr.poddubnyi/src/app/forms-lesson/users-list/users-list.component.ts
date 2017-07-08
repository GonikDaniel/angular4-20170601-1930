import { Component, OnInit } from '@angular/core';
import { IUser } from 'app/users-currency/shared/user';
import { UserService } from 'app/users-currency/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit {

  users: IUser[];

  constructor(private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  editUser(index: number) {
    this.router.navigate(['user', index], { relativeTo: this.activatedRoute });
  }

  editUserReactive(index: number) {
    this.router.navigate(['user-reactive', index], { relativeTo: this.activatedRoute });
  }
}
