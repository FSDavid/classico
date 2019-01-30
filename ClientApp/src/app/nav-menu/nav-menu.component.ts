import {Component, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {GetTokenService} from '../sources/shared/getToken.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {

  dropdownvisible: false;

  constructor(private router: Router, private gts: GetTokenService) {}

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
