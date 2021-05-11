import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { List } from './list';
import { Recipe } from './recipe';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {        //The recipe service handles api calls and contains methods related to recipes

  //API settings is stored in an environment file
  private edamam_app_id = environment.edamam_app_id;
  private edamam_app_key = environment.edamam_app_key;
  private edamam_api_url = environment.edamam_api_url;
  private edamam_api_auth = "&app_id=" + this.edamam_app_id + "&app_key=" + this.edamam_app_key;
  private heroku_api_url = environment.heroku_api_url;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  //Uses the http client for making an api call with parameters
  getRecipes(query:string, dishType:Array<string> = null, health:Array<string> = null, mealType:Array<string> = null, max:number = 100): Observable<Recipe[]> {
    return this.http.get<any>(this.edamam_api_url + query + this.edamam_api_auth + "&to=" + max + (dishType && dishType.length ? "&dishType=" + dishType.join("&dishType=") : "") + (health && health.length ? "&health=" + health.join("&health=") : "") + (mealType && mealType.length ? "&mealType=" + mealType.join("&mealType=") : "")).pipe(
      map(res => res.hits.map(res => res.recipe))
    ).pipe(
      retry(3) && catchError(this.handleError)      //Retry 3 times in case of an error and uses a separate method for handling the error
    );
  }

  getRecipe(id:string): Observable<Recipe> {
    return this.http.get<any>(this.edamam_api_url + id + this.edamam_api_auth).pipe(
      map(res => res.hits.map(res => res.recipe))
    ).pipe(
      retry(3) && catchError(this.handleError)
    );
  }

  getRecipeLists(): Observable<List[]> {
    return this.http.get<any>(this.heroku_api_url + "/list").pipe(
      map(res => res)
      ).pipe(
        retry(3) && catchError(this.handleError)
      )
  }

  getRecipeId(recipe:Recipe): string {
    return recipe?.uri.substr(recipe.uri.indexOf('#') + 8, recipe.uri.length);      //Get the recipe id from the uri
  }

  private handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    return throwError(alert('An error occured, please try again.'));
  }
}