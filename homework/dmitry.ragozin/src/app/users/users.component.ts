import { Component, OnInit } from '@angular/core';
import {UsersService} from '../users.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users;
  userListForm;

  constructor(private userService: UsersService, private _formBuilder: FormBuilder) {
    this.users = this.userService.getAll();
    this.userListForm = this._formBuilder.group({
      users: this._formBuilder.array([])
    });
    for (let i = 0; i < this.users.length; i++) {
      this.userListForm.controls.users.push(
        this._formBuilder.group({
          name: this.users[i].name,
          surname: this.users[i].surname,
          email: this.users[i].email,
        })
      )
    };
  }

  ngOnInit() {
  }
  removeUser(id) {
    this.userListForm.controls.users.removeAt(id);
    this.userService.removeUser(id)
  }
  addUser() {
    const newUser = {name: '', surname: '', email: '', id: this.users.length};
    this.userListForm.controls.users.push(this._formBuilder.group({name: newUser.name, surname: newUser.surname, email: newUser.email}));
    this.userService.addUser(newUser);
  }


}
