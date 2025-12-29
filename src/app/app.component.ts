import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { StorageService } from './services/storage-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private storageService: StorageService) {
    this.initMeasurementSetting();
  }

  async initMeasurementSetting(){
    let exists = await this.storageService.get("measurementSetting");
    if(!exists){
      await this.storageService.set("measurementSetting", JSON.stringify("metric"));
    }
  }

}
