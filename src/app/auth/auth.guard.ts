import {
  ActivatedRouteSnapshot, CanActivate, CanLoad,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isAuthenticated();
  }

  canLoad() {
    return this.authService.isAuthenticated();
  }
}
