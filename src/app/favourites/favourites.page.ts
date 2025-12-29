import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { StorageService } from '../services/storage-service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardContent, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class FavouritesPage implements OnInit {

  constructor(private storageService: StorageService) { }

  favouritesData: any = [];

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getFavourites();
  }

  async getFavourites(){
    let favouritesArray = JSON.parse(await this.storageService.get("favourites"));
    if(favouritesArray){
      this.favouritesData = favouritesArray;
    }else{
      this.favouritesData = [];
    }
  }

}
