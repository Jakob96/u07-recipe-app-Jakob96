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

  getShoppingList(recipeId:string): Observable<JSON> {
    return this.http.get<any>(this.heroku_api_url + '/shoppinglists/' + recipeId).pipe(
      map(res => res)
    ).pipe(
      retry(3) && catchError(this.handleError)      //Retry 3 times in case of an error and uses a separate method for handling the error
    );
  }

  private handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    return throwError(error);
  }
}
