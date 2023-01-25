import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultPreparationPage } from './result-preparation.page';

const routes: Routes = [
  {
    path: '',
    component: ResultPreparationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultPreparationPageRoutingModule {}
