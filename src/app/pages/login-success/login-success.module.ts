import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginSuccessPageRoutingModule } from './login-success-routing.module';

import { LoginSuccessPage } from './login-success.page';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatRippleModule,
    LoginSuccessPageRoutingModule
  ],
  declarations: [LoginSuccessPage]
})
export class LoginSuccessPageModule {}
