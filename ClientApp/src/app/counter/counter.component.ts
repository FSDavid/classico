import { Component } from '@angular/core';
import {GetTokenService} from '../sources/shared/getToken.service';
import {catchError, map} from 'rxjs/internal/operators';
import {Observable, throwError} from 'rxjs/index';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.components.scss']
})
export class CounterComponent {}
