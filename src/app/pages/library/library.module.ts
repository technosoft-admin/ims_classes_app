import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibraryPageRoutingModule } from './library-routing.module';

import { LibraryPage } from './library.page';
import { SharedModule } from 'src/app/shared/shared.module';
// import { CalendarModule } from 'ion2-calendar';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MatNativeDateModule,
    HttpClientModule,
    MatDatepickerModule,
    MatCardModule,
    LibraryPageRoutingModule
  ],
  declarations: [LibraryPage]
})
export class LibraryPageModule {}
