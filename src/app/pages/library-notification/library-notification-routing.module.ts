import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibraryNotificationPage } from './library-notification.page';

const routes: Routes = [
  {
    path: '',
    component: LibraryNotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryNotificationPageRoutingModule {}
