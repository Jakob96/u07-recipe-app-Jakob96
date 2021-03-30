import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})

export class RecipeListComponent implements OnInit {
  @Input() search: string;
  @Input() dishType: Array<string>;
  @Input() health: Array<string>;
  recipes: Recipe[] = [];
  mealType: Array<string>;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    if (this.search) {
      this.getRecipes(this.search, 50);
    }
    else {
      this.getMealRecommendation();
    }
  }

  ngOnChanges(changes: SimpleChanges){
    if (this.search) {
      this.getRecipes(this.search, 50)
    }
    else {
      this.getMealRecommendation();
    }
  }

  getRecipes(query, max, mealType = null) {
    this.recipeService.getRecipes(query, this.dishType, this.health, mealType, max)
      .subscribe(res => {
        this.recipes = res;
      })
  }

  getMealRecommendation() {
  const currentHour = parseInt(new Date().toLocaleTimeString('sv-se').substr(0, 2));

    switch(true) {
      case (currentHour <= 10 && currentHour > 6):
        this.mealType = ['breakfast'];
        break;
      case (currentHour <= 13):
        this.mealType = ['lunch'];
        break;
      case (currentHour <= 21):
        this.mealType = ['dinner'];
        break;
      default:
        this.mealType = ['snack'];
        break;
    }

    this.getRecipes(this.mealType[0], 50, this.mealType);
  }
}
