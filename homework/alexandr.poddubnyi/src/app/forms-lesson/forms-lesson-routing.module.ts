import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from 'app/forms-lesson/users-list/users-list.component';
import { FormsLessonComponent } from 'app/forms-lesson/forms-lesson.component';
import { UserFormComponent } from 'app/forms-lesson/user-form/user-form.component';
import { UserReactiveFormComponent } from 'app/forms-lesson/user-reactive-form/user-reactive-form.component';

const routes: Routes = [
   {
    path: 'forms-lesson',
    component: FormsLessonComponent,
    children: [
      { path: 'user/:index', component: UserFormComponent },
      { path: 'user-reactive/:index', component: UserReactiveFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class FormsLessonRoutingModule {
}
