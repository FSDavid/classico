
import {Observable, throwError} from 'rxjs/index';
import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/internal/operators';
import {HttpClient} from '@angular/common/http';
import {RefreshTokenViewModel} from '../../auth/login/login-view-model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Injectable()
export class GetTokenService {

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private router: Router) {}




  refreshTokenViewModel: RefreshTokenViewModel = {username: '', ref_token: ''};

    queryUri: any;
    queryQuery: any;




  QueryStringToJSON(pairs: string) {
    return JSON.parse('{"' + decodeURI(pairs.substring(1).replace(/&/g, "\",\"")
      .replace(/=/g, "\":\"")) + '"}');
  }

  JSONToQueryString(pairs: any) {
    const str = [];
    for (const p in pairs) {
      if (pairs.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(pairs[p]));
      }
    }
    return str.join('&');
  }

  routeAfterLogIn() {

    this.route.queryParamMap.subscribe(params => {
      this.queryUri = params.get('uri');
      this.queryQuery = params.get('query');
    });

    if (this.queryUri && this.queryUri !== '/') {

      if (this.queryQuery) {
        this.router.navigate([this.queryUri], {queryParams:
            this.QueryStringToJSON(this.queryQuery)
          });
      } else {
        this.router.navigate(['/' + this.queryUri]);
      }
    } else {
      this.router.navigate(['/']);
    }

      // this.queryUri = null;

  }

  logOutTemp() {
    this.clearToken();

    if (location.pathname) {
      if (!location.search) {
        this.router.navigate(['auth'], {queryParams: {uri: location.pathname}});
      } else {
        this.router.navigate(['auth'], {queryParams: {uri: location.pathname, query: location.search}});
      }
    } else {
      this.router.navigate(['auth']);
    }

  }

  logOut(route: string = '') {
    this.clearToken();
    this.router.navigate(['auth']);
  }

  clearToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('ref_token');
  }

  refreshToken() { // : Observable<any>
    console.log('refreshing');

    // return this.httpClient.get('api/SampleData/TestAction', {
    //   observe: 'body',
    //   responseType: 'json'
    // });

    const helper = new JwtHelperService();

    const RefUsername = helper.decodeToken(localStorage.getItem('ref_token'))['sub'];
    const AccUsername = helper.decodeToken(localStorage.getItem('access_token'))['sub'];

    if (RefUsername !== AccUsername) {
      return throwError('error');
    }

    this.refreshTokenViewModel.username = RefUsername;
    this.refreshTokenViewModel.ref_token = localStorage.getItem('ref_token');

    return this.httpClient.post('https://localhost:44312/api/auth/rft', this.refreshTokenViewModel, {
      observe: 'body',
      responseType: 'json'
    });
  }

  refreshToken2() {
      console.log('get2');

      return this.httpClient.get('api/SampleData/TestAction2', {
        observe: 'body',
        responseType: 'text'
      });




    // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // const token = currentUser.refreshToken;
    //
    // return this.http.post<ICurrentUser>('http://localhost:53217/api/Account/Token/Refresh', { 'token': token })
    //   .pipe(
    //     map(user => {
    //
    //       if (user && user.accessToken) {
    //         localStorage.setItem('currentUser', JSON.stringify(user));
    //       }
    //
    //       return <ICurrentUser>user;
    //     }));
  }

}

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

export function refreshTokenGetter() {
  return localStorage.getItem('ref_token');
}

// export function refreshToken() {
//   console.log('refreshing...');
//
//   return 1;
// }
