import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendanceNotificationPageRoutingModule } from './attendance-notification-routing.module';

import { AttendanceNotificationPage } from './attendance-notification.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AttendanceNotificationPageRoutingModule
  ],
  declarations: [AttendanceNotificationPage]
})
export class AttendanceNotificationPageModule {}
