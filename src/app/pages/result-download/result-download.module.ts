import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultDownloadPageRoutingModule } from './result-download-routing.module';

import { ResultDownloadPage } from './result-download.page';
import { MatRippleModule } from '@angular/material/core';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MatRippleModule,
    ResultDownloadPageRoutingModule
  ],
  declarations: [ResultDownloadPage]
})
export class ResultDownloadPageModule {}
