import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes(environment.heroku_api_url) && this.authService.getToken()) {
      const token = this.authService.getToken();

      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + token
        }
      });
    };
    
    return next.handle(request);
  }
}
