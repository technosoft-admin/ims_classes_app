import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendancePageRoutingModule } from './attendance-routing.module';

import { AttendancePage } from './attendance.page';
import { SharedModule } from 'src/app/shared/shared.module';
// import { CalendarModule } from 'ion2-calendar';
import {MatNativeDateModule} from '@angular/material/core';
// import {HttpClientModule} from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';


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
    AttendancePageRoutingModule
  ],
  declarations: [AttendancePage]
})
export class AttendancePageModule {}
