import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AbstractControl } from "@angular/forms";
import { IValidationError } from './error-interface';

@Injectable()
export class AsyncValidatorsService {

  constructor() { }

  userEmailUnique = userEmailUnique;
}

function userEmailUnique(c: AbstractControl): Observable<IValidationError | null>  {
  let email = c.value;
  return new Observable((observer) => {
    if( email === "exist@mail.com" ) {
      observer.next({emailNotUnique: { message: 'Email is not unique' }});
      observer.complete();
    } else {
      observer.next(null);
    }
  })
}
