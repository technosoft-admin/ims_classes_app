import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeesPageRoutingModule } from './fees-routing.module';

import { FeesPage } from './fees.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MatRippleModule,
    FeesPageRoutingModule
  ],
  declarations: [FeesPage]
})
export class FeesPageModule {}
