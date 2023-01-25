import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeWorkAddPageRoutingModule } from './home-work-add-routing.module';

import { HomeWorkAddPage } from './home-work-add.page';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MatRadioModule,
    MatCheckboxModule,
    AngularEditorModule,
    HomeWorkAddPageRoutingModule
  ],
  declarations: [HomeWorkAddPage]
})
export class HomeWorkAddPageModule {}
