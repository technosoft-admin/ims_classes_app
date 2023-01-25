import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnnouncementPageRoutingModule } from './announcement-routing.module';

import { AnnouncementPage } from './announcement.page';
import { SharedModule } from 'src/app/shared/shared.module';
// import { CalendarModule } from 'ion2-calendar';
import {MatNativeDateModule} from '@angular/material/core';
// import {HttpClientModule} from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { NgCalendarModule } from 'ionic2-calendar'; 


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    // CalendarModule,
    MatNativeDateModule,
    // HttpClientModule,
    MatCardModule,
    MatDatepickerModule,
    AnnouncementPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [AnnouncementPage],
  
})
export class AnnouncementPageModule {}
