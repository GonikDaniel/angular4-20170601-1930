import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserService } from 'app/users-currency/user.service';
import { FormsLessonRoutingModule } from 'app/forms-lesson/forms-lesson-routing.module';
import { FormsLessonComponent } from './forms-lesson.component';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { EmailValidationDirective } from './shared/email-validation.directive';
import { UserReactiveFormComponent } from './user-reactive-form/user-reactive-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsLessonRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [UsersListComponent, UserFormComponent, FormsLessonComponent, EmailValidationDirective, UserReactiveFormComponent],
  providers: [UserService]
})
export class FormsLessonModule {
}
