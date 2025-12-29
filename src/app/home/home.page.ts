import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton, IonInput, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settingsOutline, heart } from 'ionicons/icons';
import { HttpService } from '../services/http-service';
import { HttpOptions } from '@capacitor/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonItem, IonInput, FormsModule, NgFor, RouterLink],
})
export class HomePage {

  constructor(private httpService: HttpService) {
    addIcons({ settingsOutline, heart });
  }

  searchText: string = "";
  searchUrl: string = "https://api.spoonacular.com/recipes/complexSearch?apiKey=70759a4f7911402abcc53d3c51d3b759&query=";
  apiResults: any;

  options: HttpOptions = {
    url: ""
  }

  async search(){
    this.options.url = this.searchUrl + this.searchText;
    let result = await this.httpService.get(this.options);
    this.apiResults = result.data.results;
  }

}
