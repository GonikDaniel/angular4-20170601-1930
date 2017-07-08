import { NgModule } from '@angular/core';
import { ValidatorsService, AsyncValidatorsService, FormUtilsService } from './bundle';

@NgModule({
  providers: [ValidatorsService, AsyncValidatorsService, FormUtilsService]
})
export class ValidatorsModule { }