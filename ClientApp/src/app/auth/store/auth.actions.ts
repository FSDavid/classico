import {Action} from '@ngrx/store';
import {ForgetEmailViewModel, LoginViewModel} from '../login/login-view-model';
import {SignupViewmodel} from '../signup/sign-up-view-model';
import {FacebookLoginViewModel} from '../facebook-login/facebook-login-view-model';
import {FacebookEmailViewModel} from '../facebook-login/facebook-email-view-model';

export const LOGIN_WITH_EMAIL = 'LOGIN_WITH_EMAIL';
export const LOGIN_WITH_FACEBOOK = 'LOGIN_WITH_FACEBOOK';
export const FB_EMAIL_LOGIN = 'FB_EMAIL_LOGIN';
export const LOGGED_IN = 'LOGGED_IN';
export const SEND_FORGOT_EMAIL = 'SEND_FORGOT_EMAIL';
export const SIGNUP_WITH_EMAIL = 'SIGNUP_WITH_EMAIL';
export const LOGOUT = 'LOGOUT';
export const GET_STATUS = 'GET_STATUS';
export const GET_TOKEN = 'GET_TOKEN';
export const SET_TOKEN = 'SET_TOKEN';

export const AUTH_SPINNER_SHOW = 'AUTH_SPINNER_SHOW';
export const AUTH_SPINNER_HIDE = 'AUTH_SPINNER_HIDE';
export const REG_SPINNER_SHOW = 'REG_SPINNER_SHOW';
export const REG_SPINNER_HIDE = 'REG_SPINNER_HIDE';

export const EMAIL_EXISTS_ALERT_SHOW = 'EMAIL_EXISTS_ALERT_SHOW';
export const EMAIL_EXISTS_ALERT_HIDE = 'EMAIL_EXISTS_ALERT_HIDE';
export const INCORRECT_AUTH_SHOW = 'INCORRECT_AUTH_SHOW';
export const INCORRECT_AUTH_HIDE = 'INCORRECT_AUTH_HIDE';

export const FORGOT_EMAIL_SENT_SHOW = 'FORGOT_EMAIL_SENT_SHOW';
export const FORGOT_EMAIL_SENT_HIDE = 'FORGOT_EMAIL_SENT_HIDE';

export const SET_FB_TOKEN = 'SET_FB_TOKEN';
export const FB_EMAIL_SHOW = 'FB_EMAIL_SHOW';
export const FB_EMAIL_HIDE = 'FB_EMAIL_HIDE';

export class LoginWithEmail implements Action {
  readonly type = LOGIN_WITH_EMAIL;
  constructor (public payload: LoginViewModel) {}
}

export class LoginWithFacebook implements Action {
  readonly type = LOGIN_WITH_FACEBOOK;
  constructor (public payload: FacebookLoginViewModel) {}
}

export class LoginWithFacebookEmail implements Action {
  readonly type = FB_EMAIL_LOGIN;
  constructor (public payload: FacebookEmailViewModel) {}
}

export class LoggedIn implements Action {
  readonly type = LOGGED_IN;
}

export class SendForgotEmail implements Action {
  readonly type = SEND_FORGOT_EMAIL;
  constructor (public payload: ForgetEmailViewModel) {}
}

export class SignupWithEmail implements Action {
  readonly type = SIGNUP_WITH_EMAIL;
  constructor (public payload: SignupViewmodel) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class GetStatus implements Action {
  readonly type = GET_STATUS;
}

export class GetToken implements Action {
  readonly type = GET_TOKEN;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;
  constructor (public payload: string) {}
}


export class AuthSpinnerShow implements Action {
  readonly type = AUTH_SPINNER_SHOW;
}

export class AuthSpinnerHide implements Action {
  readonly type = AUTH_SPINNER_HIDE;
}

export class RegSpinnerShow implements Action {
  readonly type = REG_SPINNER_SHOW;
}

export class RegSpinnerHide implements Action {
  readonly type = REG_SPINNER_HIDE;
}


export class EmailExistsAlertShow implements Action {
  readonly type = EMAIL_EXISTS_ALERT_SHOW;
}

export class EmailExistsAlertHide implements Action {
  readonly type = EMAIL_EXISTS_ALERT_HIDE;
}

export class IncorrectAuthShow implements Action {
  readonly type = INCORRECT_AUTH_SHOW;
}

export class IncorrectAuthHide implements Action {
  readonly type = INCORRECT_AUTH_HIDE;
}

export class ForgorEmailSentShow implements Action {
  readonly type = FORGOT_EMAIL_SENT_SHOW;
}

export class ForgorEmailSentHide implements Action {
  readonly type = FORGOT_EMAIL_SENT_HIDE;
}

export class SetFbToken implements Action {
  readonly type = SET_FB_TOKEN;
  constructor (public payload: string) {}
}

export class FbEmailShow implements Action {
  readonly type = FB_EMAIL_SHOW;
}

export class FbEmailHide implements Action {
  readonly type = FB_EMAIL_HIDE;
}


export type UserStatusActons = LoginWithEmail
  | SignupWithEmail
  | LoginWithFacebook
  | LoggedIn
  | SendForgotEmail
  | Logout
  | GetStatus
  | GetToken
  | SetToken
  | AuthSpinnerShow
  | AuthSpinnerHide
  | RegSpinnerShow
  | RegSpinnerHide
  | EmailExistsAlertShow
  | EmailExistsAlertHide
  | IncorrectAuthShow
  | IncorrectAuthHide
  | ForgorEmailSentShow
  | ForgorEmailSentHide
  | SetFbToken
  | FbEmailShow
  | FbEmailHide
  | LoginWithFacebookEmail;
