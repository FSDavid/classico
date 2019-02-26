import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/index';
import * as globalStoreActions from './sources/global-store/global-store.actions';
import * as globalStoreReducer from './sources/global-store/globalstores.reducers';
import {Store} from '@ngrx/store';
import {UserModel} from './sources/models/user.model';
import {Observable} from 'rxjs/Rx';
import {tokenGetter} from './sources/shared/getToken.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'app';

  userData: UserModel = new UserModel('','','','','','','');
  userDataObservable: Observable<{userInfo: UserModel}>;


  constructor(private store: Store<globalStoreReducer.GlobalstoresState>) {}

  exp: Subscription;

  ngOnInit() {
    if (tokenGetter()) {
      this.store.dispatch(new globalStoreActions.GetUserInfo());
    }
    this.userDataObservable = this.store.select('globalStores');
    this.userDataObservable.subscribe(s => {
      this.userData = s.userInfo;
    });
  }

  ngOnDestroy() {
    this.exp.unsubscribe();
  }
}
