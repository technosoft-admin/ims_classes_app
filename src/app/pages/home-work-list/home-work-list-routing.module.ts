import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeWorkListPage } from './home-work-list.page';

const routes: Routes = [
  {
    path: '',
    component: HomeWorkListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeWorkListPageRoutingModule {}
