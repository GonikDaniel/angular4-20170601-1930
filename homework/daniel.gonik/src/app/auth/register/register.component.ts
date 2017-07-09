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
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private contactsService: ContactsService
  ) { }

  ngOnInit() {
    this.user = this.formBuilder.group({
      firstName: [''],
      surname: [''],
      email: ['', Validators.email, this.uniqueEmail.bind(this)],
      username: ['', [Validators.required], this.uniqueUsername.bind(this)],
      password: ['', Validators.required]
    });

    // this.user.valueChanges.subscribe(console.log);
    this.user.statusChanges.subscribe(() => console.log(this.user.errors))
  }

  public register() {
    if (!this.user.valid) return;

    this.authService.register(this.user.value)
      .subscribe(
        (user) => this.login(user.username, user.password),
        (error) => console.error(error)
      );
  }

  private login(username, password) {
    this.authService.login(username, password)
      .subscribe(
        (data) => this.router.navigate(['/app/inbox']), // this.returnUrl
        (error) => this.errorMsg = error
      );
  }

  private uniqueEmail(formControl: FormControl) {
    if (!this.contactsService.isEmailUnique(formControl.value)) {
      return Observable.of({ uniqueEmail: { error: 'Email has to be unique!' } });
    }
    return Observable.of(null);
  }

  private uniqueUsername(formControl: FormControl) {
    if (!this.contactsService.isUsernameUnique(formControl.value)) {
      return Observable.of({ uniqueUsername: { error: 'Username has to be unique!' } });
    }
    return Observable.of(null);
  }


}
