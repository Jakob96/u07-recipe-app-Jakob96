import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';
import { List } from '../list';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-save-recipe',
  templateUrl: './save-recipe.component.html',
  styleUrls: ['./save-recipe.component.scss']
})
export class SaveRecipeComponent implements OnInit {
  id: string = '';
  recipe: Recipe;
  lists: List[] = [];
  listSelection: string = '';

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => { this.getRecipe(params['id']); this.id = params['id']; });
    this.getRecipeLists();
  }

  getRecipe(id:string): void {
    this.recipeService.getRecipe(id).subscribe(
      (res) => {
        this.recipe = res[0];
      }
    )
  } 

  getRecipeLists(): void {
    this.recipeService.getRecipeLists().subscribe(
      (res) => {
        this.lists = res;
      }
    )
  }

  addRecipe(): void {
    if (this.listSelection && this.recipe) {
      this.recipeService.addRecipe(this.id, this.listSelection, this.recipe.label, this.recipe.image).subscribe(
        (res) => {
          this.snackBar.open('The recipe has been saved!', 'Close', {
            duration: 3000
          });
        },
        (error) => {
          if (error.status === 500) {
            this.snackBar.open('The recipe is already in this list', 'Close', {
              duration: 3000
            });
          }
          else {
            alert('An error occured, please try again.');
          }
        }
      )}
  }
}
