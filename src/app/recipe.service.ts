import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
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

  getRecipes(query:string, max:number = 100): Observable<Recipe[]> {
    return this.http.get<any>(this.api_url + query + this.api_auth + "&to=" + max).pipe(
      map(res => res.hits.map(res => res.recipe))
    );
  }

  getRecipe(id:string): Observable<Recipe> {
    return this.http.get<any>(this.api_url + id + this.api_auth).pipe(
      map(res => res.hits.map(res => res.recipe))
    );
  }
}