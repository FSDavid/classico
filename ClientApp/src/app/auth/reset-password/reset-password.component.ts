import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {Store} from '@ngrx/store';
import * as authActions from '../store/auth.actions';
import * as authReducer from '../store/auth.reducers';
import {ResetPasswordViewModel} from './reset-password-view-model';
import {catchError, map, switchMap} from 'rxjs/internal/operators';
import {throwError} from 'rxjs/index';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  regIsLoadingObservable: Observable<{regIsLoadingFromState: boolean}>;
  regIsLoading = true;

  passwordChanged = false;
  errorFromServer = false;

  resetPasswordForm = this.fb.group({
    password: [{value: '', disabled: true},  [Validators.required, Validators.minLength(6)]],
    confirmPassword: [{value: '', disabled: true},  [Validators.required, Validators.minLength(6)]],
    }, {
    validator: MustMatch('password', 'confirmPassword')
  });
  get f() { return this.resetPasswordForm.controls; }


  constructor(private fb: FormBuilder,
              private store: Store<authReducer.UserState>,
              private httpClient: HttpClient,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.regIsLoadingObservable = this.store.select('userStatus');
    this.regIsLoadingObservable
      .subscribe(s => {
        this.regIsLoading = s.regIsLoadingFromState;
        if (s.regIsLoadingFromState) {
          this.resetPasswordForm.controls['password'].disable();
          this.resetPasswordForm.controls['confirmPassword'].disable();
        } else {
          this.resetPasswordForm.controls['password'].enable();
          this.resetPasswordForm.controls['confirmPassword'].enable();
        }
      });
  }

  resetPassword(password: string) {
    this.passwordChanged = false;
    this.errorFromServer = false;

    const resetPasswordObject: ResetPasswordViewModel = {
      userId: this.route.snapshot.queryParamMap.get('userId'),
      token: this.route.snapshot.queryParamMap.get('code'),
      password: password
    };
    console.log(resetPasswordObject);

    this.store.dispatch(new authActions.RegSpinnerShow());
    return this.httpClient.post('https://localhost:44312/api/accounts/changeresetpassword', resetPasswordObject, {
      observe: 'body',
      responseType: 'text'
    }).pipe(
       map((tmp) => {
        this.passwordChanged = true;
        this.errorFromServer = false;
        return this.store.dispatch(new authActions.RegSpinnerHide());
      }),
      catchError((err) => {
        return throwError(err);
      })
    ).subscribe();
  }
}



export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({mustMatch: true});
    } else {
      matchingControl.setErrors(null);
    }
  };
}
