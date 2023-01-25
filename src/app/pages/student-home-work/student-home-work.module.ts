import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentHomeWorkPageRoutingModule } from './student-home-work-routing.module';

import { StudentHomeWorkPage } from './student-home-work.page';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatDialogModule} from '@angular/material/dialog';
import { PinchZoomModule } from "ngx-pinch-zoom";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    MatDialogModule,
    PinchZoomModule,
    StudentHomeWorkPageRoutingModule
  ],
  declarations: [StudentHomeWorkPage]
})
export class StudentHomeWorkPageModule {}
