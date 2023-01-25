import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackPagePageRoutingModule } from './feedback-page-routing.module';

import { FeedbackPagePage } from './feedback-page.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MatRippleModule,
    FeedbackPagePageRoutingModule
  ],
  declarations: [FeedbackPagePage]
})
export class FeedbackPagePageModule {}
