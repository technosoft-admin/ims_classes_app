import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentListPageRoutingModule } from './student-list-routing.module';

import { StudentListPage } from './student-list.page';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MatCheckboxModule,
    StudentListPageRoutingModule
  ],
  declarations: [StudentListPage]
})
export class StudentListPageModule {}
