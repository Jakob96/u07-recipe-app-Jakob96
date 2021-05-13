import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})

export class RecipeListComponent implements OnInit {
  //Input decorator for input data attributes
  @Input() search: string;
  @Input() dishType: Array<string>;
  @Input() health: Array<string>;
  recipes: Recipe[] = [];                       //Declares an empty array for recipe objects
  private subscriptions = new Subscription();   //The subscription object contains all subscriptions

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    if (this.search) {                    //If search is set, do an api call or get meal recommendations based on time of the day
      this.getRecipes(this.search, 50);
    }
    else {
      this.getMealRecommendations();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();   //Unsubscribes all subscriptions when component is destroyed
  }

  ngOnChanges(changes: SimpleChanges): void {     //If input data changes
    if (this.search || this.dishType && this.dishType.length || this.health && this.health.length) {  
      this.getRecipes(this.search, 50)
    }
    else {
      this.getMealRecommendations();
    }
  }

  //Uses the recipe service and subscribes to an observable for retrieves the recipes
  getRecipes(query:string, max:number, mealType:string[] = null): void {
    this.subscriptions.add(this.recipeService.getRecipes(query, this.dishType, this.health, mealType, max)
      .subscribe(res => {
        this.recipes = res;
      }));
  }

  getMealRecommendations(): void {
  const currentHour = parseInt(new Date().toLocaleTimeString('sv-se').substr(0, 2));
  let mealType: Array<string>;

  //Pick a meal type depending on current hour
    switch(true) {
      case (currentHour <= 10 && currentHour >= 6):
        mealType = ['breakfast'];
        break;
      case (currentHour <= 13 && currentHour >= 11):
        mealType = ['lunch'];
        break;
      case (currentHour <= 21 && currentHour >= 17):
        mealType = ['dinner'];
        break;
      default:
        mealType = ['snack'];
        break;
    }

    this.getRecipes(mealType[0], 50, mealType);
  }

  getRecipeId(recipe:Recipe): string {
    return this.recipeService.getRecipeId(recipe);
  }
}
