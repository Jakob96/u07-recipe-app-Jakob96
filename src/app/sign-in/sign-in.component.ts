import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  signIn(): void {
    if (this.email && this.password) {
      this.loading = true;

      this.authService.signIn(this.email, this.password).subscribe(resp => { 
        localStorage.setItem('token', resp.access_token);
        localStorage.setItem('user', JSON.stringify(resp.user));

        this.router.navigate(['/']);
      }).add(() => { this.loading = false; });
    }
  }
}
