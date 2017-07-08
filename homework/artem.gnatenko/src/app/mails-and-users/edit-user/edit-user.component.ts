import { Component, OnInit } from '@angular/core';
import { UsersService } from '../user-list/users.service';
import { IUser } from '../user-list/user-list.component';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AsyncValidatorsService, FormUtilsService } from 'app/validators/bundle';;

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: FormGroup;
  editUserForm: any;
  submitted: boolean;

  constructor(
    private usersService: UsersService, 
    private activatedRoute: ActivatedRoute,
    private asyncValidatorsService: AsyncValidatorsService,
    private formBuilder: FormBuilder,
    private formUtilsService: FormUtilsService,
  ) {
    this.submitted = false;
  }

  ngOnInit() {
    this.activatedRoute.params.pluck('id').subscribe((id: string) => {
      this.user = this.formBuilder.group({
        id: +id,
        firstName: ["", Validators.required],
        surname: ["", Validators.required],
        country: ["", Validators.required],
        photo: ["", Validators.required],
        email: ["", [Validators.required, Validators.email], this.asyncValidatorsService.userEmailUnique]
      });
      this.usersService.getUsersList().subscribe(
        (users: IUser[]) => { this.user.patchValue(users[+id - 1]) }
      )
    });
  }

  saveUser(editUserForm: NgForm): void {
    if (this.user.invalid) {
      this.formUtilsService.formMarkAsTouched(this.user);
      alert("form invalid");
    };
  }

}
