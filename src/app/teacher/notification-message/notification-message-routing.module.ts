import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NotificationMessagePage } from './notification-message.page';
import { MatInputModule } from  '@angular/material/input';

const routes: Routes = [
  {
    path: '',
    component: NotificationMessagePage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatInputModule,
    FormsModule
  ],
  exports: [RouterModule],
})
export class NotificationMessagePageRoutingModule {}
