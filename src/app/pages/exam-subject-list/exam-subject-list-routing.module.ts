import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamSubjectListPage } from './exam-subject-list.page';

const routes: Routes = [
  {
    path: '',
    component: ExamSubjectListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamSubjectListPageRoutingModule {}
