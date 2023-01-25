import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeWorkAddPage } from './home-work-add.page';

const routes: Routes = [
  {
    path: '',
    component: HomeWorkAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeWorkAddPageRoutingModule {}
