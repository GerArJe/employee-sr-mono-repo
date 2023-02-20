import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { DataModule } from '../../data/data.module';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { RatingComponent } from './components/rating/rating.component';
import { FiltersComponent } from './components/filters/filters.component';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [
    HomeComponent,
    EmployeeCardComponent,
    ContactInfoComponent,
    RatingComponent,
    FiltersComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    IonicModule,
    SharedModule,
    DataModule,
    ReactiveFormsModule,
    UserModule
  ],
})
export class HomeModule {}
