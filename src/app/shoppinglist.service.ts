import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Shoppinglist } from './shoppinglist';

@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {
  private heroku_api_url = environment.heroku_api_url;

  constructor(private http: HttpClient) { }

  getShoppingList(recipeId:string): Observable<Shoppinglist> {
    return this.http.get<any>(this.heroku_api_url + '/shoppinglists/' + recipeId).pipe(
      map(res => res)
    ).pipe(
      retry(3) && catchError(this.handleError)
    );
  }

  addShoppingList(recipeId:string): Observable<Shoppinglist> {
    const formData = new FormData();
    formData.append('name', null);
    formData.append('edamamId', recipeId);

    return this.http.post<any>(this.heroku_api_url + '/shoppinglists', formData).pipe(
      map(res => res)
    ).pipe(
      retry(3) && catchError(this.handleError)
    );
  }

  addShoppingListItem(listId:string, item:string): Observable<any> {
    const formData = new FormData();
    formData.append('shoppinglistId', listId);
    formData.append('item', item);

    return this.http.post<any>(this.heroku_api_url + '/shoppinglistitems', formData).pipe(
      map(res => res)
    ).pipe(
      retry(3) && catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    return throwError(error);
  }
}
