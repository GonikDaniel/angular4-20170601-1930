import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/users-currency/user.service';
import { IUser } from 'app/users-currency/shared/user';
import {
  FormBuilder, FormControl, FormGroup,
  NgForm, Validators
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'user-reactive-form',
  templateUrl: './user-reactive-form.component.html'
})
export class UserReactiveFormComponent implements OnInit {

  user: IUser;
  userIndex: string;
  userForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.getUserData();

    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      surname: ['', [Validators.required]],
      country: ['', [Validators.required]],
      email: ['', [Validators.required], this.customAsyncValidator.bind(this)],
    });
  }

  onSubmit(form: NgForm) {
    this.userService
      .updateUser(this.userIndex, form.value);
  }

  private getUserData() {
    this.activatedRoute
      .params
      .pluck('index')
      .subscribe((index: string) => {
        this.userIndex = index;

        this.userService
          .getUsers()
          .subscribe((users) => {
            this.user = users[index];

            this.userForm.patchValue(this.user);
          });
      });
  }

  private customAsyncValidator(formControl: FormControl): Observable<boolean> {
    return new Observable(observer => {
      this.userService
        .isUniqueField('email', formControl.value)
        .subscribe((isUnique) => {
          if (isUnique) {
            observer.next(null);
          } else {
            observer.next({ customValidator: 'Email is not unique' });
          }
        });
    }).debounceTime(1000).first();
  }
}


