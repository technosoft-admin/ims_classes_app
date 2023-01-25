import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeesPaymentPageRoutingModule } from './fees-payment-routing.module';

import { FeesPaymentPage } from './fees-payment.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MatRippleModule,
    FeesPaymentPageRoutingModule
  ],
  declarations: [FeesPaymentPage]
})
export class FeesPaymentPageModule {}
