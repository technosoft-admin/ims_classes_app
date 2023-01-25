import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExamListPageRoutingModule } from './exam-list-routing.module';

import { ExamListPage } from './exam-list.page';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MatCheckboxModule,
    ExamListPageRoutingModule
  ],
  declarations: [ExamListPage]
})
export class ExamListPageModule {}
