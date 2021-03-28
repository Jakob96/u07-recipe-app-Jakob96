import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})

export class RecipeListComponent implements OnInit {
  @Input() filter: string;
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.getRecipes(this.filter, 50);
  }

  ngOnChanges(changes: SimpleChanges){
    this.getRecipes(this.filter, 50)
  }

  getRecipes(query, max) {
    this.recipeService.getRecipes(query, max)
      .subscribe(data => {
        this.recipes = data;
      })
  }
}
