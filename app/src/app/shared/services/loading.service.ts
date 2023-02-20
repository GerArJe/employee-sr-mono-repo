import { Injectable } from '@angular/core';

import { LoadingController, LoadingOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(private loadingCtrl: LoadingController) {}

  async showLoading(opts: LoadingOptions): Promise<HTMLIonLoadingElement> {
    return await this.loadingCtrl.create(opts);
  }
}
