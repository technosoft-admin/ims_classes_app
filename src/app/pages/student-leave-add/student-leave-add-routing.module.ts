import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentLeaveAddPage } from './student-leave-add.page';

const routes: Routes = [
  {
    path: '',
    component: StudentLeaveAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentLeaveAddPageRoutingModule {}
