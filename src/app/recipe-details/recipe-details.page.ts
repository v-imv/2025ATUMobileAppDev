import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonItem, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http-service';
import { HttpOptions } from '@capacitor/core';
import { StorageService } from '../services/storage-service';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonIcon, IonLabel, IonItem, IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RecipeDetailsPage implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
	private storageService: StorageService
  ) {
	addIcons({ heart });
  }

  apiResult: any;
  measurementSetting: string = "";
  isFavourite: boolean = false;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const recipeDetailsId = Number(params["id"]);
      this.getRecipeDetails(recipeDetailsId);
    });
  }

  async getRecipeDetails(id: number){
	this.measurementSetting = JSON.parse(await this.storageService.get("measurementSetting"));
    let options: HttpOptions = {
      url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=70759a4f7911402abcc53d3c51d3b759`
    }
    let result = await this.httpService.get(options);
	this.apiResult = result.data;
	await this.checkIfFavourite(id);
  }

  async checkIfFavourite(id: number){
	let favourites = await this.storageService.get("favourites");
	let favouriteFound = false;
	if(favourites){
		let favouritesArray = JSON.parse(favourites);
		for(let i = 0; i < favouritesArray.length; i++){
			if(favouritesArray[i].id == id){
				favouriteFound = true;
				break;
			}
		}
	}
	this.isFavourite = favouriteFound;
  }

  async addToFavourites(id: number, imageUrl: string){
	let favourites = await this.storageService.get("favourites");
	if(favourites){
		let favouritesArray = JSON.parse(favourites);
		favouritesArray.push({"id": id, "imageUrl": imageUrl});
		await this.storageService.set("favourites", JSON.stringify(favouritesArray));
	} else{
		await this.storageService.set("favourites", JSON.stringify([{"id": id, "imageUrl": imageUrl}]));
	}
	await this.checkIfFavourite(id);
  }

  async removeFromFavourites(id: number){
	let favouritesArray = JSON.parse(await this.storageService.get("favourites"));
	let indexToRemove = favouritesArray.findIndex((element: {"id": number, "imageUrl": string}) => element.id == id);
	favouritesArray.splice(indexToRemove, 1);
	if(favouritesArray.length){
		await this.storageService.set("favourites", JSON.stringify(favouritesArray));
	}else{
		await this.storageService.remove("favourites");
	}
	await this.checkIfFavourite(id);
  }

}
