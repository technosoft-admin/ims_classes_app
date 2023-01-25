import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentLeaveAddPageRoutingModule } from './student-leave-add-routing.module';

import { StudentLeaveAddPage } from './student-leave-add.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MatRadioModule,
    MatCheckboxModule,
    StudentLeaveAddPageRoutingModule
  ],
  declarations: [StudentLeaveAddPage]
})
export class StudentLeaveAddPageModule {}
