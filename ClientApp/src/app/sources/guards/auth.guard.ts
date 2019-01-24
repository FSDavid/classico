import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/index';
import {JwtHelperService} from '@auth0/angular-jwt';
import {GetTokenService, refreshTokenGetter, tokenGetter} from '../shared/getToken.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (private router: Router, private gts: GetTokenService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {  ////// : Observable<boolean> | Promise<boolean> | boolean
    const refToken = refreshTokenGetter();
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(refToken);

    if (refToken && !isExpired) {
        return true;
    }

    // ამ სკრიფტს გადაყავს ავტორიზაციის გვერდზე
    if (state.url.length > 0) {
      if (!location.search) {
        this.router.navigate(['auth'], {queryParams: {uri: state.url}});
      } else {
        this.router.navigate(['auth'], {queryParams: {uri: route.url, query: this.gts.JSONToQueryString(route.queryParams)}});
      }
    } else {
      this.router.navigate(['auth']);
    }
  }

}
