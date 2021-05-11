import { Component } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-recipe-list',
  templateUrl: './add-recipe-list.component.html',
  styleUrls: ['./add-recipe-list.component.scss']
})
export class AddRecipeListComponent {
  name: string = '';
  description: string = '';

  constructor(private recipeService: RecipeService, private router: Router) { }

  addRecipeList():void {
    if (this.name) {
      this.recipeService.addRecipeList(this.name, this.description).subscribe(res => {
        this.router.navigate(['/lists']);
      });
    } 
  }
}
