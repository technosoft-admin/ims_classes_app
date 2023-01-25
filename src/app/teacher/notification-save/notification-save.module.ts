import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationSavePageRoutingModule } from './notification-save-routing.module';

import { NotificationSavePage } from './notification-save.page';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MatRadioModule,
    MatCheckboxModule,
    NotificationSavePageRoutingModule
  ],
  declarations: [NotificationSavePage]
})
export class NotificationSavePageModule {}
