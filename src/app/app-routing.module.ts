import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShowRecipeComponent } from './show-recipe/show-recipe.component';
import { SavedRecipesListComponent } from './saved-recipes-list/saved-recipes-list.component';
import { ErrorComponent } from './error/error.component';

//Handles the available url:s
const routes: Routes = [
  { path: '', component:  HomeComponent },    //Root component
  { path: 'recipe/:id', component: ShowRecipeComponent },
  { path: 'saved-recipes', component: SavedRecipesListComponent },
  { path: '**', component: ErrorComponent },  //If no route match, display the error component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
