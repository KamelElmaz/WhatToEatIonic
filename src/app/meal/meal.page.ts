import { Component, OnInit } from '@angular/core';
import {MEALDB_Meal} from '../model';
import {MealdbApiService} from '../mealdb-api.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage implements OnInit {
  meal: MEALDB_Meal | null = null;
  ingredients: string[] = [];

  constructor(private mealdb: MealdbApiService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    let mealId: string = this.route.snapshot.paramMap.get('id');
    this.mealdb.findById(mealId).subscribe(meal => {
      this.meal = meal;
      this.ingredients = this.getIngredients(meal);
    });
  }

  getYoutubeLink(meal: MEALDB_Meal): SafeResourceUrl{
    let videoId = meal.strYoutube.split('=')[1];
    let ytlink = 'https://www.youtube.com/embed/' + videoId;
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://youtube.com/embed/' + videoId);
  }

  getIngredients(meal: MEALDB_Meal): string[]{
    for (var i = 1; i <= 20; i++){
      let ingredient = meal['strIngredient' + i];
      if (ingredient !== ''){
        this.ingredients.push(ingredient);
      }
    }
    return this.ingredients;
  }

}
