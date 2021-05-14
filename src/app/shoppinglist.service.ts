import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {
  private heroku_api_url = environment.heroku_api_url;

  constructor(private http: HttpClient) { }

  getShoppingList(recipeId:string): Observable<JSON[]> {
    return this.http.get<any>(this.heroku_api_url + '/shoppinglists/' + recipeId).pipe(
      map(res => res)
    ).pipe(
      retry(3) && catchError(this.handleError)
    );
  }

  addShoppingList(recipeId:string): Observable<JSON> {
    const formData = new FormData();
    formData.append('name', null);
    formData.append('edamamId', recipeId);

    return this.http.post<any>(this.heroku_api_url + '/shoppinglists', formData).pipe(
      map(res => res)
    ).pipe(
      retry(3) && catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    return throwError(error);
  }
}
