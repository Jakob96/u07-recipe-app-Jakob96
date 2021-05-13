import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe, Total } from '../recipe';
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
  totalNutrients: Array<Total> = [];

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
   this.subscriptions = this.route.params.subscribe(params => { this.getRecipe(params['id']); });       //Retrieves the id parameter from url and calls getRecipe
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getRecipe(id:string): void {
    this.subscriptions = this.recipeService.getRecipe(id).subscribe(res => { 
      this.recipe = res[0];
      Object.entries(this.recipe["totalNutrients"]).map(data => this.totalNutrients.push(<Total>data[1]));
    });
  }

  getRecipeId(recipe:Recipe): string {
    return this.recipeService.getRecipeId(recipe);
  }
}
