import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeWorkStudentListPageRoutingModule } from './home-work-student-list-routing.module';

import { HomeWorkStudentListPage } from './home-work-student-list.page';

import { SharedModule } from 'src/app/shared/shared.module';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MatRadioModule,
    MatCheckboxModule,
    HomeWorkStudentListPageRoutingModule
  ],
  declarations: [HomeWorkStudentListPage]
})
export class HomeWorkStudentListPageModule {}
