import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/users-currency/user.service';
import { IUser } from 'app/users-currency/shared/user';
import { NgForm } from "@angular/forms/src/forms";

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {

  user: IUser;
  userIndex: string;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.activatedRoute
      .params
      .pluck('index')
      .subscribe((index: string) => {
        this.userIndex = index;

        this.userService
            .getUsers()
            .subscribe((users) => {
              this.user = users[index];
            });
      });
  }

  onSubmit(form: NgForm) {
    this.userService
        .updateUser(this.userIndex, form.value);
  }
}
