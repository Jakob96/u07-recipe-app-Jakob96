import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})

export class RecipeListComponent implements OnInit {
  @Input() search: string;
  @Input() dishType: Array<string>;
  @Input() health: Array<string>;
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.getRecipes(this.search, 50);
  }

  ngOnChanges(changes: SimpleChanges){
    if (this.search) {
      this.getRecipes(this.search, 50)
    }
    else {
      this.getRecipes("", 50)
    }
  }

  getRecipes(query, max) {
    this.recipeService.getRecipes(query, this.dishType, this.health, max)
      .subscribe(res => {
        this.recipes = res;
      })
  }
}
