import { Component } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recipe-app';

  constructor() { }
}
