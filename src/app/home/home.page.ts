import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton, IonInput, IonItem } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settingsOutline, heart } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonItem, IonInput],
})
export class HomePage {

  constructor() {
    addIcons({ settingsOutline, heart });
  }


  
}
