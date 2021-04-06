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
      this.recipes.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
   }
  }

  removeRecipe(recipe:Recipe): void {
    this.recipes = this.recipes.filter((element) => element.uri != recipe.uri);
    this.recipeService.removeRecipe(recipe);

    this.snackBar.open('Recipe removed', 'Close', {
      duration: 2000
    });
  }

  getRecipeId(recipe:Recipe): string {
    return this.recipeService.getRecipeId(recipe);
  }
}
