import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-saved-recipes',
  templateUrl: './saved-recipes.component.html',
  styleUrls: ['./saved-recipes.component.scss']
})
export class SavedRecipesComponent implements OnInit {
  list: any[] = [];
  recipes: any[] = [];

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => { this.getSavedRecipes(params['id']); });
  }

  getSavedRecipes(listId:number): void {
    if (listId) {
      this.recipeService.getSavedRecipes(listId).subscribe(
        (res) => {
          this.list = res.list;
          this.recipes = res.recipes;
        }
      );
    }
  }

  removeSavedRecipe(recipeId, listId): void {
    if (recipeId && listId) {
      this.recipeService.removeSavedRecipe(recipeId, listId).subscribe(
        (res) => {
          this.snackBar.open('The recipe has been removed', 'Close', {
            duration: 3000
          });

          this.recipes = this.recipes.filter((recipe) => recipe.id !== recipeId);
        }
      )
    }
  }
}
