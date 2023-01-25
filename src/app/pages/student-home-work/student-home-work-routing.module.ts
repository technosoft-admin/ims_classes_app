import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentHomeWorkPage } from './student-home-work.page';

const routes: Routes = [
  {
    path: '',
    component: StudentHomeWorkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentHomeWorkPageRoutingModule {}
