import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultStatusPage } from './result-status.page';

const routes: Routes = [
  {
    path: '',
    component: ResultStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultStatusPageRoutingModule {}
