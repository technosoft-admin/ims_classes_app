import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExamStudentListPageRoutingModule } from './exam-student-list-routing.module';

import { ExamStudentListPage } from './exam-student-list.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MatCheckboxModule,
    ExamStudentListPageRoutingModule
  ],
  declarations: [ExamStudentListPage]
})
export class ExamStudentListPageModule {}
