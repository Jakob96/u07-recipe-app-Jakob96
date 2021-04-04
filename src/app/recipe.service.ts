import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Recipe } from './recipe';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {

  private app_id = environment.app_id;
  private app_key = environment.app_key;
  private api_url = environment.api_url;
  private api_auth = "&app_id=" + this.app_id + "&app_key=" + this.app_key;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getRecipes(query:string, dishType:Array<string> = null, health:Array<string> = null, mealType:Array<string> = null, max:number = 100): Observable<Recipe[]> {
    return this.http.get<any>(this.api_url + query + this.api_auth + "&to=" + max + (dishType && dishType.length ? "&dishType=" + dishType.join("&dishType=") : "") + (health && health.length ? "&health=" + health.join("&health=") : "") + (mealType && mealType.length ? "&mealType=" + mealType.join("&mealType=") : "")).pipe(
      map(res => res.hits.map(res => res.recipe))
    ).pipe(
      retry(3) && catchError(this.handleError)
    );
  }

  getRecipe(id:string): Observable<Recipe> {
    return this.http.get<any>(this.api_url + id + this.api_auth).pipe(
      map(res => res.hits.map(res => res.recipe))
    ).pipe(
      retry(3) && catchError(this.handleError)
    );
  }

  saveRecipe(recipe:Recipe): void {
    localStorage.setItem(this.getRecipeId(recipe), JSON.stringify(recipe));
  }

  removeRecipe(recipe:Recipe): void {
    localStorage.removeItem(this.getRecipeId(recipe));
  }

  recipeSaved(recipe:Recipe): boolean {
    return (localStorage.getItem(this.getRecipeId(recipe)) ? true : false);
  }

  getRecipeId(recipe:Recipe): string {
    return recipe?.uri.substr(recipe.uri.indexOf('#') + 8, recipe.uri.length);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(alert('An error occured, please try again.'));
  }
}