import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe, Total } from '../recipe';
import { Shoppinglist } from '../shoppinglist';
import { ShoppinglistService } from '../shoppinglist.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-show-recipe',
  templateUrl: './show-recipe.component.html',
  styleUrls: ['./show-recipe.component.scss']
})
export class ShowRecipeComponent implements OnInit {
  recipe: Recipe;
  item: string;
  private subscriptions = new Subscription();
  totalNutrients: Array<Total> = [];
  shoppingList: Array<Shoppinglist>;
  shoppingListId: string;
  recipeSavedBool: Boolean = false;

  constructor(private recipeService: RecipeService, private authService: AuthService, private shoppinglistService: ShoppinglistService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
   this.subscriptions = this.route.params.subscribe(params => { this.getRecipe(params['id']); });       //Retrieves the id parameter from url and calls getRecipe
   if (this.authService.getToken()) { this.getShoppingList() };
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

  getShoppingList(): void {
    this.recipeSaved().then(
      () => {
        if (this.recipeSavedBool) {
          this.route.params.subscribe(params => this.shoppinglistService.getShoppingList(params['id']).subscribe(
            (res) => { this.shoppingList = res.items; this.shoppingListId = res.list[0]['id'] }
          ));
        }
      }
    );
  }

  addShoppingListItem(): void {
    if (this.item) {
      this.shoppinglistService.addShoppingListItem(this.shoppingListId, this.item).subscribe(
        (res) => { this.getShoppingList(); this.item = ''; }
      );
    }
  }

  userSignedIn(): Boolean {
    return (this.authService.getToken() ? true : false);
  }

  async recipeSaved(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.route.params.subscribe(params => this.recipeService.recipeSaved(params['id']).subscribe(
        (res) => resolve((res > 0) ? this.recipeSavedBool = true : this.recipeSavedBool = false)
      ));
    })
  }
}
