import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataModule } from '../data/data.module';
import { tokenInterceptorServiceProviders } from './interceptors/token-interceptor.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, DataModule],
  providers: [tokenInterceptorServiceProviders],
})
export class CoreModule {}
