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

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    if (this.search) {
      this.getRecipes(this.search, 50);
    }
    else {
      this.getMealRecommendations();
    }
  }

  ngOnChanges(changes: SimpleChanges) {    
    if (this.search || this.dishType && this.dishType.length || this.health && this.health.length) {  
      this.getRecipes(this.search, 50)
    }
    else {
      this.getMealRecommendations();
    }
  }

  getRecipes(query, max, mealType = null) {
    this.recipeService.getRecipes(query, this.dishType, this.health, mealType, max)
      .subscribe(res => {
        this.recipes = res;
      })
  }

  getMealRecommendations() {
  const currentHour = parseInt(new Date().toLocaleTimeString('sv-se').substr(0, 2));
  let mealType: Array<string>;

    switch(true) {
      case (currentHour <= 10 && currentHour > 6):
        mealType = ['breakfast'];
        break;
      case (currentHour <= 13):
        mealType = ['lunch'];
        break;
      case (currentHour <= 21):
        mealType = ['dinner'];
        break;
      default:
        mealType = ['snack'];
        break;
    }

    this.getRecipes(mealType[0], 50, mealType);
  }
}
