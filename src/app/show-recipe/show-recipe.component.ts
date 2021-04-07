import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-recipe',
  templateUrl: './show-recipe.component.html',
  styleUrls: ['./show-recipe.component.scss']
})
export class ShowRecipeComponent implements OnInit {
  recipe: Recipe;
  instruction: string;
  private subscriptions = new Subscription();

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
   this.subscriptions = this.route.params.subscribe(params => { this.getRecipe(params['id']); });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getRecipe(id:string): void {
    if (this.recipeSaved(id)) {
      this.recipe = this.recipeService.getSavedRecipe(id);
    }
    else {
      this.subscriptions = this.recipeService.getRecipe(id).subscribe(res => { this.recipe = res[0]; });
    }
  }

  saveRecipe(recipe:Recipe): void {
    this.recipeService.saveRecipe(recipe);

    this.snackBar.open('Recipe is saved', 'Close', {
      duration: 2000
    });
  }

  removeRecipe(recipe:Recipe): void {
    this.recipeService.removeRecipe(recipe);

    this.snackBar.open('Recipe removed', 'Close', {
      duration: 2000
    });
  }

  recipeSaved(id): boolean {
    return this.recipeService.recipeSaved(id);
  }

  getRecipeId(recipe:Recipe): string {
    return this.recipeService.getRecipeId(recipe);
  }

  addRecipeInstruction(text:string, recipe:Recipe): void {
    if (text) {
      this.recipeService.addRecipeInstruction(text, recipe);
      this.instruction = '';
    }
  }
}
