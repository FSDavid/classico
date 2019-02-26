import { Directive, forwardRef, Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserLinkValidator implements AsyncValidator {
  constructor(private httpClient: HttpClient) {}

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.httpClient.get<boolean>('api/validator/check-link/' + ctrl.value).pipe(
      map(avaliable => (!avaliable ? { linkNotAvaliable: true } : null)),
      catchError(() => null)
    );
  }
}
