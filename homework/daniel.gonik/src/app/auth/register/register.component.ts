import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AuthService } from '../auth.service';
import { ContactsService } from '../../mail-box/_services/contacts.service';
import { User } from '../../_models/user';

@Component({
  selector: 'dg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: FormGroup;
  public errorMsg;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private contactsService: ContactsService
  ) { }

  ngOnInit() {
    this.user = this._formBuilder.group({
      firstName: [''],
      surname: [''],
      email: ['', Validators.email, this._uniqueEmail.bind(this)],
      username: ['', [Validators.required], this._uniqueUsername.bind(this)],
      password: ['', Validators.required]
    });

    // this.user.valueChanges.subscribe(console.log);
    this.user.statusChanges.subscribe(() => console.log(this.user.errors))
  }

  register() {
    console.log(this.user.value, this.user.valid);
  }

  _uniqueEmail(formControl: FormControl) {
    if(!this.contactsService.isEmailUnique(formControl.value)) {
      return Observable.of({ uniqueEmail: { error: 'Email has to be unique!' } });
    }
    return Observable.of(null);
  }

  _uniqueUsername(formControl: FormControl) {
    if(!this.contactsService.isUsernameUnique(formControl.value)) {
      return Observable.of({ uniqueUsername: { error: 'Username has to be unique!' } });
    }
    return Observable.of(null);
  }


}
