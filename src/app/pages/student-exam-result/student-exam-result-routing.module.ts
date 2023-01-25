import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentExamResultPage } from './student-exam-result.page';

const routes: Routes = [
  {
    path: '',
    component: StudentExamResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentExamResultPageRoutingModule {}
