import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';
import { List } from '../list';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-saved-recipes-list',
  templateUrl: './saved-recipes-list.component.html',
  styleUrls: ['./saved-recipes-list.component.scss']
})
export class SavedRecipesListComponent implements OnInit {
recipes: Recipe[] = [];
lists: List[] = [];

  constructor(private recipeService: RecipeService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getRecipeLists();
  }

  getRecipeLists(): void {
    this.recipeService.getRecipeLists().subscribe(res => {
      this.lists = res;
    });
  }

  removeRecipeList(id:number): void {
    this.recipeService.removeRecipeList(id).subscribe(res => {
      this.snackBar.open('The list has been removed', 'Close', {
        duration: 2000
      });
      
      this.lists = this.lists.filter((list) => list.id !== id);
    }, (error) => {
      alert('An error occured, please try again');
    });
  }

  getRecipeId(recipe:Recipe): string {
    return this.recipeService.getRecipeId(recipe);
  }
}
