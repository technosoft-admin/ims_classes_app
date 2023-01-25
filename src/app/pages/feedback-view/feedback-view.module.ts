import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackViewPageRoutingModule } from './feedback-view-routing.module';

import { FeedbackViewPage } from './feedback-view.page';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MatRadioModule,
    FeedbackViewPageRoutingModule
  ],
  declarations: [FeedbackViewPage]
})
export class FeedbackViewPageModule {}
