import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeWorkListPageRoutingModule } from './home-work-list-routing.module';

import { HomeWorkListPage } from './home-work-list.page';
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
    HomeWorkListPageRoutingModule
  ],
  declarations: [HomeWorkListPage]
})
export class HomeWorkListPageModule {}
