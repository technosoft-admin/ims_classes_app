import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtpCounterPage } from './otp-counter.page';

const routes: Routes = [
  {
    path: '',
    component: OtpCounterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtpCounterPageRoutingModule {}
