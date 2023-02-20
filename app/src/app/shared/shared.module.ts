import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { SearchableSelectComponent } from './components/searchable-select/searchable-select.component';
import { AddListComponent } from './components/add-list/add-list.component';

@NgModule({
  declarations: [SearchableSelectComponent, AddListComponent],
  imports: [
    CommonModule,
    TranslateModule,
    HttpClientModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TranslateModule,
    HttpClientModule,
    SearchableSelectComponent,
    AddListComponent,
  ],
})
export class SharedModule {}
