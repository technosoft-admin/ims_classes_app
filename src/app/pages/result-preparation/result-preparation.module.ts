import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultPreparationPageRoutingModule } from './result-preparation-routing.module';

import { ResultPreparationPage } from './result-preparation.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MatRadioModule,
    MatCheckboxModule,
    AngularEditorModule,
    ResultPreparationPageRoutingModule
  ],
  declarations: [ResultPreparationPage]
})
export class ResultPreparationPageModule {}
