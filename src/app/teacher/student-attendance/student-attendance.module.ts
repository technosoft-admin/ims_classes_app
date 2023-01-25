import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentAttendancePageRoutingModule } from './student-attendance-routing.module';

import { StudentAttendancePage } from './student-attendance.page';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MatDialogModule,
    MatCheckboxModule,
    StudentAttendancePageRoutingModule
  ],
  declarations: [StudentAttendancePage]
})
export class StudentAttendancePageModule {}
