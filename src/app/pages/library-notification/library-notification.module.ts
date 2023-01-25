import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibraryNotificationPageRoutingModule } from './library-notification-routing.module';

import { LibraryNotificationPage } from './library-notification.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LibraryNotificationPageRoutingModule
  ],
  declarations: [LibraryNotificationPage]
})
export class LibraryNotificationPageModule {}
