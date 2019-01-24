import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as authReducer from '../store/auth.reducers';
import * as authActions from '../store/auth.actions';
import {FacebookLoginViewModel} from './facebook-login-view-model';


declare var FB: any;

@Component({
  selector: 'app-facebook-login',
  templateUrl: './facebook-login.component.html',
  styleUrls: ['./facebook-login.component.scss']
})
export class FacebookLoginComponent implements OnInit {

  fbtoken: FacebookLoginViewModel = {accessToken: ''};

  constructor(private store: Store<authReducer.UserState>, private httpClient: HttpClient) {}

  submitLogin() {
    FB.login((response) => {
      if (response.authResponse['accessToken']) {
        this.fbtoken.accessToken = response.authResponse['accessToken'];
        this.store.dispatch(new authActions.LoginWithFacebook(this.fbtoken));
      } else {
        console.log('User login failed');
      }
    });
  }

  ngOnInit() {
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '1462028933932434',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.2'
      });
      FB.AppEvents.logPageView();
    };
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/ka_GE/sdk.js#xfbml=1&autoLogAppEvents=1&version=v3.2&appId=1462028933932434';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
}
