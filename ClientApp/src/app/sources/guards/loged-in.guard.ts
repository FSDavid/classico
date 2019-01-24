import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {refreshTokenGetter, tokenGetter} from '../shared/getToken.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class LogedInGuard implements CanActivate {
  constructor (private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {

    const refToken = refreshTokenGetter();
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(refToken);
    if (!refToken || isExpired) {
      return true;
    }

    // ამ სკრიფტს გადაყავს მთავარ გვერდზე
    this.router.navigate(['/'] );
  }

}
