import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'app';


  constructor() {}

  exp: Subscription;

  ngOnInit() {}

  ngOnDestroy() {
    this.exp.unsubscribe();
  }
}
