import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentLeaveListPage } from './student-leave-list.page';

const routes: Routes = [
  {
    path: '',
    component: StudentLeaveListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentLeaveListPageRoutingModule {}
