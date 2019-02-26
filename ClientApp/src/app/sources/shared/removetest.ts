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
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private gts: GetTokenService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(error => {
          if (req.url.includes('refreshtoken') || req.url.includes('login')) {
            return throwError(error);
          }
          if (error.status !== 401) {
            if (error.status === 409) {
              return throwError(error);
            }
            return throwError(error);
          }
          if (this.refreshTokenInProgress) {
            return this.refreshTokenSubject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap(() => {
                return next.handle(this.addAuthenticationToken(req));
              })
            );
          } else {
            this.refreshTokenInProgress = true;
            this.refreshTokenSubject.next(null);
            return this.gts.refreshToken().pipe(
              mergeMap((token: any) => {
                localStorage.setItem('access_token', token['auth_token']);
                localStorage.setItem('ref_token', token['ref_token']);
                this.refreshTokenInProgress = false;
                this.refreshTokenSubject.next(token);
                return next.handle(this.addAuthenticationToken(req));
              }),
              catchError((err: any) => {
                this.refreshTokenInProgress = false;
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
