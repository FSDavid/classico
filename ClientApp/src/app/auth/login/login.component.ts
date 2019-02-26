import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ForgetEmailViewModel, LoginViewModel} from './login-view-model';
import {Store} from '@ngrx/store';

import * as authActions from '../store/auth.actions';
import * as authReducer from '../store/auth.reducers';
import {ElementRef} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {FacebookEmailViewModel} from '../facebook-login/facebook-email-view-model';
import { Observable } from 'rxjs';

@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  forgorPassword = false;

  emailModel = '';
  passwordModel = '';

  passwordVisible = false;

  // tslint:disable-next-line:max-line-length
  authIsLoadingObservable: Observable<{authIsLoadingFromState: boolean, incorrectAuth: boolean, forgotEmailSent: boolean, fbEmail: boolean, fbToken: string}>;
  authIsLoading = false;
  incorrectAuth = false;
  sentToEmail = false;
  fbEmail = false;
  fbToken = '';

  @ViewChild('UsernameFild') uf: ElementRef;
  @ViewChild('PasswordField') pf: ElementRef;


  authenticationForm = this.fb.group({
    email: [{value: '', disabled: true}, [Validators.required, Validators.email]],
    password: [{value: '', disabled: true},  [Validators.required, Validators.minLength(6)]],
  });
  get f() { return this.authenticationForm.controls; }

  forgotPasswordForm = this.fb.group({
    emailForgot: [{value: '', disabled: true}, [Validators.required, Validators.email]],
  });
  get f1() { return this.forgotPasswordForm.controls; }


  fbEmailForm = this.fb.group({
    fbEmail: [{value: '', disabled: true}, [Validators.required, Validators.email]],
  });
  get f2() { return this.fbEmailForm.controls; }


  ngAfterViewInit() {
    this.uf.nativeElement.focus();
    this.emailModel = this.uf.nativeElement.value;
    this.passwordModel = this.pf.nativeElement.value;

  }


  constructor(private store: Store<authReducer.UserState>, private fb: FormBuilder) { }

  ngOnInit() {
    this.authIsLoadingObservable = this.store.select('userStatus');
    this.authIsLoadingObservable
      .subscribe(s => {
        this.authIsLoading = s.authIsLoadingFromState;
        this.incorrectAuth = s.incorrectAuth;
        this.sentToEmail = s.forgotEmailSent;
        this.fbToken = s.fbToken;
        this.fbEmail = s.fbEmail;
        if (s.authIsLoadingFromState) {
          this.authenticationForm.controls['email'].disable();
          this.authenticationForm.controls['password'].disable();
          this.forgotPasswordForm.controls['emailForgot'].disable();
          this.fbEmailForm.controls['fbEmail'].disable();
        } else {
          this.authenticationForm.controls['email'].enable();
          this.authenticationForm.controls['password'].enable();
          this.forgotPasswordForm.controls['emailForgot'].enable();
          this.fbEmailForm.controls['fbEmail'].enable();
        }
      });
  }

  LogIn(loginViewModel: LoginViewModel) {
    this.store.dispatch(new authActions.LoginWithEmail(loginViewModel));
  }
  sendForgotPassword(forgetEmailViewModel: ForgetEmailViewModel) {
    this.store.dispatch(new authActions.SendForgotEmail(forgetEmailViewModel));
  }
  sendFbEmail(mail: string) {
    const facebookEmailViewModel: FacebookEmailViewModel = {email: mail, accessToken: this.fbToken};
    this.store.dispatch(new authActions.LoginWithFacebookEmail(facebookEmailViewModel));
  }

  cancelForgot() {
    this.forgorPassword = false;
    this.store.dispatch(new authActions.AuthSpinnerHide());
    this.store.dispatch(new authActions.IncorrectAuthHide());
    this.store.dispatch(new authActions.ForgorEmailSentHide());
    this.authIsLoading = false;
    this.incorrectAuth = false;
    this.sentToEmail = false;
  }
  applyForgot() {
    this.forgorPassword = true;
    this.store.dispatch(new authActions.AuthSpinnerHide());
    this.store.dispatch(new authActions.IncorrectAuthHide());
    this.store.dispatch(new authActions.ForgorEmailSentHide());
    this.authIsLoading = false;
    this.incorrectAuth = false;
    this.sentToEmail = false;
  }
}
