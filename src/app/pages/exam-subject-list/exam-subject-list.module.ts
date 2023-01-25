import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExamSubjectListPageRoutingModule } from './exam-subject-list-routing.module';

import { ExamSubjectListPage } from './exam-subject-list.page';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MatRadioModule,
    MatCheckboxModule,
    MatExpansionModule,
    ExamSubjectListPageRoutingModule
  ],
  declarations: [ExamSubjectListPage]
})
export class ExamSubjectListPageModule {}
