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
export class AuthInterceptor implements HttpInterceptor {

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
