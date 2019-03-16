import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs/index';
import {catchError, filter, map, mergeMap, switchMap, take, tap} from 'rxjs/internal/operators';
import {GetTokenService, tokenGetter} from './getToken.service';
import {Injectable} from '@angular/core';

@Injectable()
export class RefInterceptor implements  HttpInterceptor {

  private refreshTokenInProgress = false;
  // Refresh Token Subject tracks the current token, or is null if no token is currently
  // available (e.g. refresh pending).
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private gts: GetTokenService) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req)
      .pipe(

        catchError(error => {

        // ეს გასასწორებელია რო ზუსტი ლინკები დაჯდეს
        if (req.url.includes('refreshtoken') || req.url.includes('login')) {
          // We do another check to see if refresh token failed
          // In this case we want to logout user and to redirect it to login page
          if (req.url.includes('refreshtoken')) {
            return throwError(error); // აქ ლოგაუთს გავაკეთებ
            // this.auth.logout();
          }
          return throwError(error);
          // return Observable.throw(error);
        }

        // If error status is different than 401 we want to skip refresh token
        // So we check that and throw the error if it's the case
        if (error.status !== 401) {
          if (error.status === 409 /*&& error.error['DuplicateUserName']*/) {
            // console.log(req);
            // console.log(error.status);
            return throwError(error);
          }


          // this.gts.logOutTemp();
          return throwError(error);
          // return Observable.throw(error);
        }

        if (this.refreshTokenInProgress) {
          // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
          // – which means the new token is ready and we can retry the request again
          return this.refreshTokenSubject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap(() => {
                // console.log('do now');
                return next.handle(this.addAuthenticationToken(req));
              })
          );
        } else {
          this.refreshTokenInProgress = true;

          // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
          this.refreshTokenSubject.next(null);

          // Call auth.refreshAccessToken(this is an Observable that will be returned)
          return this.gts.refreshToken().pipe( // ეს ეწერა და იმედია არ დამჭირდება this.auth.refreshAccessToken().
                mergeMap((token: any) => {

                  localStorage.setItem('access_token', token['auth_token']);
                  localStorage.setItem('ref_token', token['ref_token']);

                  // When the call to refreshToken completes we reset the refreshTokenInProgress to false
                  // for the next time the token needs to be refreshed
                  this.refreshTokenInProgress = false;
                  this.refreshTokenSubject.next(token);

                  return next.handle(this.addAuthenticationToken(req));
                }),
                catchError((err: any) => {
                  this.refreshTokenInProgress = false;

                  // this.auth.logout(); აქაც ლოგაუთს გავაკეთებ
                  this.gts.logOutTemp();
                  return throwError(error);
                })
              );
        }
      })

    );

  }



  addAuthenticationToken(request) {
    if (!tokenGetter()) {
      return request;
    }
    return request.clone({headers: request.headers.append('authorization', 'Bearer ' + tokenGetter())});

  }

}
