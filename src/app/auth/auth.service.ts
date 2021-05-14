import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from './user'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private heroku_api_url = environment.heroku_api_url;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  signIn(email:string, password:string): Observable<User> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return this.http.post<any>(this.heroku_api_url + '/login', formData).pipe(
      map(res => res))
      .pipe(catchError(this.handleError));
  };

  register(name:string, email:string, password:string, password_conf:string): Observable<JSON> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', password_conf);

    return this.http.post<any>(this.heroku_api_url + '/register', formData).pipe(
      map(res => res))
      .pipe(catchError(this.handleError));
  };

  signOut(): Observable<JSON> {
    return this.http.post<any>(this.heroku_api_url + '/logout', null).pipe(
      map(res => res))
      .pipe(catchError(this.handleError));
  };

  removeUserData(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  getToken(): String {
    return localStorage.getItem('token');
  } 

  private handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    return throwError(error);
  }
}
