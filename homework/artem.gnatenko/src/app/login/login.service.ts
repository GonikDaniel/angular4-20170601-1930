import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
  userLoggedIn: boolean;

  constructor(private router: Router) { }

  login(email: string, password: string): void {
    if (email && password) {
      this.userLoggedIn = true;
      this.router.navigate(['/']);
    }
    else {
      alert('Entered data is incorrect');
    }
  }

  logout(): void {
    this.userLoggedIn = false;
    this.router.navigate(['/']);
  }

  isUserLoggedIn(): boolean {
    return !this.userLoggedIn;
  }
}
