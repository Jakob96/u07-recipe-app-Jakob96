import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  headerTitle = 'Recipe app';

  constructor(private authService: AuthService, private router: Router) { }

  isSignedIn(): boolean{
    return (this.authService.getToken()) ? true : false;
  }

  signOut(): void {
    this.authService.signOut().subscribe((resp) => {
      this.router.navigate(['/']);
    })
    .add(() => {
      this.authService.removeUserData();
    });
  };

  getUserName(): string {
    return JSON.parse(localStorage.getItem('user')).name;
  }
}
