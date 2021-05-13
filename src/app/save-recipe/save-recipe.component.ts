import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';
import { List } from '../list';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

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

}
