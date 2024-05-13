import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGaurd implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        if (user) {
          if (user.email === 'admin@admin.com') {
            return true;
          } else {
            return this.router.createUrlTree(['/about']);
          }
        } else {
          return this.router.createUrlTree(['/auth']);
        }
      })
    );
  }
}
