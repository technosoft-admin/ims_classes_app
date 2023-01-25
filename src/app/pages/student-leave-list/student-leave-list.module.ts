import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentLeaveListPageRoutingModule } from './student-leave-list-routing.module';

import { StudentLeaveListPage } from './student-leave-list.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MatButtonModule,
    MatCheckboxModule,
    StudentLeaveListPageRoutingModule
  ],
  declarations: [StudentLeaveListPage]
})
export class StudentLeaveListPageModule {}
