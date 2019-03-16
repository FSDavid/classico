import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GetTokenService} from '../sources/shared/getToken.service';
import {UserModel} from '../sources/models/user.model';
import {Observable} from 'rxjs/Rx';
import * as globalStoreActions from '../sources/global-store/global-store.actions';
import * as globalStoreReducer from '../sources/global-store/globalstores.reducers';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit{

  dropdownvisible = false;
  username = 'Davita';

  userData: UserModel;
  userDataObservable: Observable<{userInfo: UserModel}>;

  constructor(private store: Store<globalStoreReducer.GlobalstoresState>, private router: Router, private gts: GetTokenService) {}

  ngOnInit() {
    this.userDataObservable = this.store.select('globalStores');
    this.userDataObservable.subscribe(s => {
      this.userData = s.userInfo;
      // if (!this.userData.pictureUrl.startsWith('http') || !this.userData.pictureUrl.startsWith('.')) {
      //   // this.store.dispatch(new globalStoreActions.UpdatePicture(this.userData.pictureUrl));
      //   this.userData.pictureUrl = '../../assets/images/profile_pictures/' + this.userData.pictureUrl;
      // }

    })
  }

  logOut() {
    this.gts.clearToken();
    this.router.navigate(['auth'] );
  }

  showDropDown() {
    this.dropdownvisible = true;
  }

  disableSearch(dis) {
    if (dis === 1) {
      this.dropdownvisible = false;
    }
  }
}
