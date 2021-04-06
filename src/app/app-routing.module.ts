import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShowRecipeComponent } from './show-recipe/show-recipe.component';
import { SavedRecipesListComponent } from './saved-recipes-list/saved-recipes-list.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: '', component:  HomeComponent },
  { path: 'recipe/:id', component: ShowRecipeComponent },
  { path: 'saved-recipes', component: SavedRecipesListComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
