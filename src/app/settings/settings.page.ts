import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRadioGroup, IonRadio } from '@ionic/angular/standalone';
import { StorageService } from '../services/storage-service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonRadio, IonRadioGroup, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {

  constructor(private storageService: StorageService) { }

  measurementSettingKey: string = "measurementSetting";
  measurementSettingValue: string = "";
  defaultMeasurementSettingValue: string = "metric";

  ngOnInit() {
    this.determineMeasurementSettingOnInit();
  }

  async determineMeasurementSettingOnInit(){
    let previousSetting = await this.storageService.get(this.measurementSettingKey);
    if(previousSetting){
      this.measurementSettingValue = JSON.parse(previousSetting);
    } else {
      this.measurementSettingValue = this.defaultMeasurementSettingValue; // default value
      await this.storageService.set(this.measurementSettingKey, this.defaultMeasurementSettingValue);
    }
  }

  async handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const selectedValue = JSON.stringify(target.value);
    await this.storageService.set(this.measurementSettingKey, selectedValue);
  }

}
