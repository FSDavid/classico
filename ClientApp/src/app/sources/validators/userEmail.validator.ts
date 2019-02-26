import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidator, ValidationErrors} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/internal/operators';

@Injectable({ providedIn: 'root' })
export class UserEmailValidator implements AsyncValidator {
  constructor(private httpClient: HttpClient) {}

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.httpClient.get<boolean>('api/validator/check-email/' + ctrl.value).pipe(
      map(avaliable => (!avaliable ? { emailNotAvailable: true } : null)),
      catchError(() => null)
    );
  }
}
