import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../providers/auth/auth.service';

@Injectable()
export class OnlyLoggedinUserGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authService: AuthService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this._authService._utils.isLoggedIn())
      return true;

    this._router.navigate(['/auth']);
    return false;
  }
}
