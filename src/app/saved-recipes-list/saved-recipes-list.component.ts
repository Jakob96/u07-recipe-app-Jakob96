import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-saved-recipes-list',
  templateUrl: './saved-recipes-list.component.html',
  styleUrls: ['./saved-recipes-list.component.scss']
})
export class SavedRecipesListComponent implements OnInit {
recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getSavedRecipes();
  }

  getSavedRecipes(): void {
   for (let i = 0; i < localStorage.length; i++) {
      this.recipes.push(JSON.parse(localStorage.getItem(localStorage.key(i))));     //Loops through local storage, converts the string to an object and push the recipe object to the recipe array
   }
  }

  removeRecipe(recipe:Recipe): void {
    this.recipes = this.recipes.filter((element) => element.uri != recipe.uri);     //Filter out a recipe from the array and the second method removes it from local storage
    this.recipeService.removeRecipe(recipe);

    this.snackBar.open('Recipe removed', 'Close', {
      duration: 2000
    });
  }

  getRecipeId(recipe:Recipe): string {
    return this.recipeService.getRecipeId(recipe);
  }
}
