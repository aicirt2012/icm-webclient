import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './shared';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.queryParams['jwt'] != null) {
      localStorage.setItem('email-jwt', route.queryParams['jwt']);
      this.auth.token = route.queryParams['jwt'];
      this.router.navigate(['/box/0'], { queryParams: {} });
    }
    if (this.auth.isAuthenticated()) {
      // logged in so return true
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
