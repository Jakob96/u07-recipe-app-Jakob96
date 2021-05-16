import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {     //Auth interceptor is activated on each request and if the request matches the specific api url and a token exists in localstorage, add an auth header with the token included

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes(environment.heroku_api_url) && this.authService.getToken()) {
      const token = this.authService.getToken();

      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + token
        }
      });
    };

    /*If token has expired, remove user data and redirect to sign in page
    Code inspiration from https://lironhazan.medium.com/angular-6-401-authentication-error-handling-888922def566 */

    return next.handle(request).pipe(tap(() => {}, 
    (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 401) {
         return;
        }
        this.authService.removeUserData();
        this.router.navigate(['/sign-in']);
      }
    }));
  }
}
