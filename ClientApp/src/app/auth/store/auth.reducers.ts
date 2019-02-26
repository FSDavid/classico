import * as userStatusActons from './auth.actions';
import {JwtHelperService} from '@auth0/angular-jwt';


export interface UserState {
  userStatus: State;
}

export interface  State {
  personAutorized: boolean;
  personToken: string;
  regIsLoadingFromState: boolean;
  authIsLoadingFromState: boolean;
  emailExistsAlert: boolean;
  incorrectAuth: boolean;
  forgotEmailSent: boolean;
  fbToken: string;
  fbEmail: boolean;
}

const initialState: State = {
  personAutorized: false,
  personToken: '',
  regIsLoadingFromState: false,
  authIsLoadingFromState: false,
  emailExistsAlert: false,
  incorrectAuth: false,
  forgotEmailSent: false,
  fbToken: '',
  fbEmail: false,
};

export function userStateReducer (state = initialState, action: userStatusActons.UserStatusActons) {
  switch (action.type) {
    case(userStatusActons.GET_TOKEN):
      return null;
    case (userStatusActons.GET_STATUS):
      return null;
    case (userStatusActons.LOGOUT) :
      return null;
    case (userStatusActons.SET_TOKEN):
      // const helper = new JwtHelperService();
      // const decodedToken = helper.decodeToken(action.payload['auth_token']);
      // const expirationDate = helper.getTokenExpirationDate(action.payload['auth_token']);


      localStorage.setItem('access_token', action.payload['auth_token']);
      localStorage.setItem('ref_token', action.payload['ref_token']);

      return {
        ...state,
        personToken: action.payload['auth_token'],
        personAutorized: true
      };
    case(userStatusActons.AUTH_SPINNER_SHOW):
      return { ...state, authIsLoadingFromState: true };
    case(userStatusActons.AUTH_SPINNER_HIDE):
      return { ...state, authIsLoadingFromState: false };
    case(userStatusActons.REG_SPINNER_SHOW):
      return { ...state, regIsLoadingFromState: true };
    case(userStatusActons.REG_SPINNER_HIDE):
      return { ...state, regIsLoadingFromState: false };
    case(userStatusActons.EMAIL_EXISTS_ALERT_SHOW):
      return { ...state, emailExistsAlert: true };
    case(userStatusActons.EMAIL_EXISTS_ALERT_HIDE):
      return { ...state, emailExistsAlert: false };
    case(userStatusActons.INCORRECT_AUTH_SHOW):
      return { ...state, incorrectAuth: true };
    case(userStatusActons.INCORRECT_AUTH_HIDE):
      return { ...state, incorrectAuth: false };
    case(userStatusActons.FORGOT_EMAIL_SENT_SHOW):
      return { ...state, forgotEmailSent: true };
    case(userStatusActons.FORGOT_EMAIL_SENT_HIDE):
      return { ...state, forgotEmailSent: false };
    case(userStatusActons.SET_FB_TOKEN):
      return { ...state, fbToken: action.payload};
    case(userStatusActons.FB_EMAIL_SHOW):
      return { ...state, fbEmail: true };
    case(userStatusActons.FB_EMAIL_HIDE):
      return { ...state, fbEmail: false };

    default:
      return {
        ...state
      };
  }
}
