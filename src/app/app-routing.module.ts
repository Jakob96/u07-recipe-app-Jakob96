import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShowRecipeComponent } from './show-recipe/show-recipe.component';

const routes: Routes = [
  { path: '', component:  HomeComponent },
  { path: 'recipe/:id', component: ShowRecipeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
