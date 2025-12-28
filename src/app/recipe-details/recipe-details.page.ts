import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http-service';
import { HttpOptions } from '@capacitor/core';
import { StorageService } from '../services/storage-service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RecipeDetailsPage implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
	private storageService: StorageService
  ) {}

  apiResult: any;
  measurementSetting: string = "";

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params['id']);
      this.getRecipeDetails(params['id'])
    });
  }

  async getRecipeDetails(id: number){
	this.measurementSetting = JSON.parse(await this.storageService.get("measurementSetting"));
    let options: HttpOptions = {
      url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=70759a4f7911402abcc53d3c51d3b759`
    }
    let result = await this.httpService.get(options);
	this.apiResult = result.data;
    console.log("result", result);
	console.log("apiresult", this.apiResult);
  }

}
