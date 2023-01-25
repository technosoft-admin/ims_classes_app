import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultStatusPageRoutingModule } from './result-status-routing.module';

import { ResultStatusPage } from './result-status.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from "ng-apexcharts";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ChartsModule,
    NgApexchartsModule,
    ResultStatusPageRoutingModule
  ],
  declarations: [ResultStatusPage]
})
export class ResultStatusPageModule {}
