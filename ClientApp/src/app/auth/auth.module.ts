import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {environment} from '../../environments/environment';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';
import {userStateReducer} from './store/auth.reducers';
import {UserEffects} from './store/auth.effects';
import {MyOwnCustomMaterialModule} from '../sources/shared/shared-ng-material.module';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faKey, faUser} from '@fortawesome/free-solid-svg-icons';
import {CommonModule} from '@angular/common';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';
library.add(faUser, faKey, faEye, faEyeSlash);


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    StoreModule.forRoot({userStatus: userStateReducer}),
    EffectsModule.forRoot([UserEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    MyOwnCustomMaterialModule,
    FontAwesomeModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    FacebookLoginComponent,
    ResetPasswordComponent
  ],
  providers: []

})

export class AuthModule {}
