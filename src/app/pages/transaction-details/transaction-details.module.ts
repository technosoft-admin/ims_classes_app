import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionDetailsPageRoutingModule } from './transaction-details-routing.module';

import { TransactionDetailsPage } from './transaction-details.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MatRippleModule,
    TransactionDetailsPageRoutingModule
  ],
  declarations: [TransactionDetailsPage]
})
export class TransactionDetailsPageModule {}
