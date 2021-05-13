import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-saved-recipes',
  templateUrl: './saved-recipes.component.html',
  styleUrls: ['./saved-recipes.component.scss']
})
export class SavedRecipesComponent implements OnInit {
  list: any[] = [];
  recipes: any[] = [];

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

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
}
