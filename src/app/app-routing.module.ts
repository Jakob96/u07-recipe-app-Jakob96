import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShowRecipeComponent } from './show-recipe/show-recipe.component';
import { SavedRecipesListComponent } from './saved-recipes-list/saved-recipes-list.component';

const routes: Routes = [
  { path: '', component:  HomeComponent },
  { path: 'recipe/:id', component: ShowRecipeComponent },
  { path: 'saved-recipes', component: SavedRecipesListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
