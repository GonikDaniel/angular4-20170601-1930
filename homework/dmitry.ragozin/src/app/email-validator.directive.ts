import { Directive } from '@angular/core';
import {NG_VALIDATORS, AbstractControl} from '@angular/forms';


@Directive({
  selector: '[emailValidatorAsync]',
  providers: [{
      provide: NG_VALIDATORS,
      //useValue: emailValidator,
      useExisting: EmailValidatorDirective,
      multi: true
    }]
})
export class EmailValidatorDirective {

  constructor() { }
  validate(control: AbstractControl): {[key: string]: any} {
    return null;
  }



}
