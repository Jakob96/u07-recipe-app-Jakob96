import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Recipies } from './recipes';
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

  getRecipies(query, max = 100): Observable<Recipies> {
    return this.http.get<Recipies>(this.api_url + query + this.api_auth + "&to=" + max);
  }
}