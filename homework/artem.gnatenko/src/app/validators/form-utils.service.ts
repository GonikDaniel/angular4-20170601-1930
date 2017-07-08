import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class FormUtilsService {

  constructor() { }

  /**
   * Mark all form fields as touched.
   * @param formGroup the container of the controls to be checked
   * @returns {void}.
   */
  formMarkAsTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls)
      .forEach(controlName => formGroup.controls[controlName].markAsTouched());
  }
}