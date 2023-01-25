import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationSavePage } from './notification-save.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationSavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationSavePageRoutingModule {}
