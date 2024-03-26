import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public auth: UserService, public router: Router) {
  }

  canActivate() {
    if (this.auth.AuthGuard()) {
        return  true
    } else {
        this.router.navigate(['login']);
      return false;
    }
  }
}

