import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeesPaymentPage } from './fees-payment.page';

const routes: Routes = [
  {
    path: '',
    component: FeesPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeesPaymentPageRoutingModule {}
