import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    const user = this.authService.getSignedInUser();
    if (user === null) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    return true;
  }
}
