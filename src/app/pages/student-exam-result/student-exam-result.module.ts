import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentExamResultPageRoutingModule } from './student-exam-result-routing.module';

import { StudentExamResultPage } from './student-exam-result.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MatCheckboxModule,
    StudentExamResultPageRoutingModule
  ],
  declarations: [StudentExamResultPage]
})
export class StudentExamResultPageModule {}
