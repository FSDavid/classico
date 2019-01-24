import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FacebookLoginComponent} from './facebook-login/facebook-login.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';

const authRoutes: Routes = [
  { path: '', redirectTo: 'login'},
  { path: 'register', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'facebook-login', component: FacebookLoginComponent},
  { path: 'resetpassword', component: ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
