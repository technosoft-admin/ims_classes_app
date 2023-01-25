import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamStudentListPage } from './exam-student-list.page';

const routes: Routes = [
  {
    path: '',
    component: ExamStudentListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamStudentListPageRoutingModule {}
