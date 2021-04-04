import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-saved-recipes-list',
  templateUrl: './saved-recipes-list.component.html',
  styleUrls: ['./saved-recipes-list.component.scss']
})
export class SavedRecipesListComponent implements OnInit {
recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getSavedRecipes();
  }

  getSavedRecipes() {
   for (let i = 0; i < localStorage.length; i++) {
      this.recipes.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
   }
  }

  removeRecipe(recipe) {
    this.recipes = this.recipes.filter((element) => element.uri != recipe.uri);
    this.recipeService.removeRecipe(recipe);
  }

  getRecipeId(recipe) {
    return this.recipeService.getRecipeId(recipe);
  }
}
