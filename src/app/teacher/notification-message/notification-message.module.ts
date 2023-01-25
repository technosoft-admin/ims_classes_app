import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationMessagePageRoutingModule } from './notification-message-routing.module';

import { NotificationMessagePage } from './notification-message.page';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    
    NotificationMessagePageRoutingModule
  ],
  declarations: [NotificationMessagePage]
})
export class NotificationMessagePageModule {}
