import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeWorkPageRoutingModule } from './home-work-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HomeWorkPage } from './home-work.page';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MatButtonModule,
    MatCheckboxModule,
    HomeWorkPageRoutingModule
    
  ],
  declarations: [HomeWorkPage]
})
export class HomeWorkPageModule {}
