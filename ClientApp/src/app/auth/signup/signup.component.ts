import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {FormBuilder, Validators} from '@angular/forms';

import * as authActions from '../store/auth.actions';
import * as authReducer from '../store/auth.reducers';
import {SignupViewmodel} from './sign-up-view-model';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  passwordVisible = false;

  regIsLoadingObservable: Observable<{regIsLoadingFromState: boolean, emailExistsAlert: boolean}>;
  regIsLoading = true;
  emailExistsAlert = true;


  @ViewChild('UsernameFild') uf: ElementRef;
  @ViewChild('PasswordField') pf: ElementRef;


  registrationForm = this.fb.group({
    email: [{value: '', disabled: true}, [Validators.required, Validators.email]],
    password: [{value: '', disabled: true},  [Validators.required, Validators.minLength(6)]],
    firstName: [{value: '', disabled: true},  [Validators.required]],
    lastName: [{value: '', disabled: true},  [Validators.required]],
  });

  get f() { return this.registrationForm.controls; }

  constructor(private store: Store<authReducer.UserState>, private fb: FormBuilder) {}

  ngOnInit() {
    this.regIsLoadingObservable = this.store.select('userStatus');
    this.regIsLoadingObservable
      .subscribe(s => {
        this.regIsLoading = s.regIsLoadingFromState;
        this.emailExistsAlert = s.emailExistsAlert;
        if (s.regIsLoadingFromState) {
          this.registrationForm.controls['email'].disable();
          this.registrationForm.controls['password'].disable();
          this.registrationForm.controls['firstName'].disable();
          this.registrationForm.controls['lastName'].disable();
        } else {
          this.registrationForm.controls['email'].enable();
          this.registrationForm.controls['password'].enable();
          this.registrationForm.controls['firstName'].enable();
          this.registrationForm.controls['lastName'].enable();
        }
      });

  }

  SignUp(signupViewmodel: SignupViewmodel) {
    this.store.dispatch(new authActions.SignupWithEmail(signupViewmodel));
  }

}
