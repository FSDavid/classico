import {Injectable, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as globalStoreActions from '../../sources/global-store/global-store.actions';
import * as globalStoreReducer from '../../sources/global-store/globalstores.reducers';

@Injectable()
export class UpdateUserInfoService {

  constructor(private store: Store<globalStoreReducer.GlobalstoresState>) {}

  updateUserInfo() {
    this.store.dispatch(new globalStoreActions.GetUserInfo());
  }

}
