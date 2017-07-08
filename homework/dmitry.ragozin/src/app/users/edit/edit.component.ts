import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/pluck';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../../users.service';
import {NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  user;
  form: FormGroup;
  constructor(private route: ActivatedRoute, private userService: UsersService, private _formBuilder: FormBuilder) {
    this.route.params.pluck('userId').subscribe(
      (userId: string) => {
        this.user = userService.getById(parseInt(userId, 10));
        this.form = this._formBuilder.group({
          name: [this.user.name, Validators.required],
          surname: [this.user.surname, Validators.required],
          email: [this.user.email, [/*emailValidator,*/ this.uniqueValidator.bind(this) /*emailValidatorAsync*/]]
        })
      }
    );



  }

  onSubmit(/*form: NgForm*/) {
    if (this.form.valid) {
      this.userService.setUser(this.user.id,
        {
          id: this.user.id,
          name: this.form.controls.name.value,
          surname: this.form.controls.surname.value,
          email: this.form.controls.email.value,
        }
        )
    }

  }

  uniqueValidator(formControl) {
    return this.userService.checkUniqueEmail(formControl.value);
  }



  ngOnInit() {
  }

}

function emailValidator(formControl) {
  if (!/[0-9a-z]+@[0-9a-z]+\.[a-z]{2,5}/i.test(formControl.value)) {
    return {emailValidator: {message: 'emailValidator'}};
  }
  return null;
}


