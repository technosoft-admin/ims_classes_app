import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackDetailsPageRoutingModule } from './feedback-details-routing.module';

import { FeedbackDetailsPage } from './feedback-details.page';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MatRadioModule,
    FeedbackDetailsPageRoutingModule
  ],
  declarations: [FeedbackDetailsPage]
})
export class FeedbackDetailsPageModule {}
