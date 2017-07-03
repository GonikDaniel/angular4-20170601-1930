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
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _contactsService: ContactsService
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
    if (!this.user.valid) return;

    this._authService.register(this.user.value)
      .subscribe(
        (user) => this._login(user.username, user.password),
        (error) => console.error(error)
      );
  }

  private _login(username, password) {
    this._authService.login(username, password)
      .subscribe(
        (data) => this._router.navigate(['/app/inbox']), // this.returnUrl
        (error) => this.errorMsg = error
      );
  }

  private _uniqueEmail(formControl: FormControl) {
    if(!this._contactsService.isEmailUnique(formControl.value)) {
      return Observable.of({ uniqueEmail: { error: 'Email has to be unique!' } });
    }
    return Observable.of(null);
  }

  private _uniqueUsername(formControl: FormControl) {
    if(!this._contactsService.isUsernameUnique(formControl.value)) {
      return Observable.of({ uniqueUsername: { error: 'Username has to be unique!' } });
    }
    return Observable.of(null);
  }


}
