import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendanceListPageRoutingModule } from './attendance-list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AttendanceListPage } from './attendance-list.page';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    AttendanceListPageRoutingModule
  ],
  declarations: [AttendanceListPage]
})
export class AttendanceListPageModule {}
