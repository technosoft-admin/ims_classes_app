import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibraryListPageRoutingModule } from './library-list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LibraryListPage } from './library-list.page';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    LibraryListPageRoutingModule
  ],
  declarations: [LibraryListPage]
})
export class LibraryListPageModule {}
