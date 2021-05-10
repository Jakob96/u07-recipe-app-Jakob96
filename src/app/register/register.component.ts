import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  password_conf: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  register(): void {
    this.loading = true;

    this.authService.register(this.name, this.email, this.password, this.password_conf).subscribe(
      (resp) => {
        this.router.navigate(['/sign-in']);
      }
    ).add(() => {
      this.loading = false;
    });
  }
}
