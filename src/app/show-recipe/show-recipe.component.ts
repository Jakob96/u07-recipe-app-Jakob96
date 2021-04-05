import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-show-recipe',
  templateUrl: './show-recipe.component.html',
  styleUrls: ['./show-recipe.component.scss']
})
export class ShowRecipeComponent implements OnInit {
  recipe: Recipe;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.route.params.subscribe(params => { this.getRecipe(params['id']); });
  }

  getRecipe(id:string): void {
    if (this.recipeSaved(id)) {
      this.recipe = this.recipeService.getSavedRecipe(id);
    }
    else {
      this.recipeService.getRecipe(id).subscribe(res => { this.recipe = res[0]; });
    }
  }

  saveRecipe(recipe:Recipe): void {
    this.recipeService.saveRecipe(recipe);
  }

  removeRecipe(recipe:Recipe): void {
    this.recipeService.removeRecipe(recipe);
  }

  recipeSaved(id): boolean {
    return this.recipeService.recipeSaved(id);
  }

  getRecipeId(recipe:Recipe): string {
    return this.recipeService.getRecipeId(recipe);
  }
}
