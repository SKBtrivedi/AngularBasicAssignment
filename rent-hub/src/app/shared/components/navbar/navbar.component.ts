import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/user/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout();
    alert('Logged out successfully.');
    this.router.navigate(['/login']);
  }
}
