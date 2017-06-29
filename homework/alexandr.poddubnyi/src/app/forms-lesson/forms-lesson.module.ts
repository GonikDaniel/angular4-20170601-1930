import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserService } from 'app/users-currency/user.service';
import { FormsLessonRoutingModule } from 'app/forms-lesson/forms-lesson-routing.module';
import { FormsLessonComponent } from './forms-lesson.component';

@NgModule({
  imports: [
    CommonModule,
    FormsLessonRoutingModule
  ],
  declarations: [UsersListComponent, UserFormComponent, FormsLessonComponent],
  providers: [UserService]
})
export class FormsLessonModule { }
