import {Component, Inject, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {GetTokenService} from '../sources/shared/getToken.service';

import * as globalStoreActions from '../sources/global-store/global-store.actions';
import * as globalStoreReducer from '../sources/global-store/globalstores.reducers';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/index';



@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
  public forecasts: WeatherForecast[];


  // weathers = new Subject<WeatherForecast[]>();
  weathers: WeatherForecast[];

  globalStoreState: Observable<any>;

  constructor(private store: Store<globalStoreReducer.GlobalstoresState>, @Inject('BASE_URL') baseUrl: string) {}

  ngOnInit() {
    this.globalStoreState = this.store.select('globalStores');

    this.store.dispatch(new globalStoreActions.GetWeatherForecasts());












    // this.weathers = this.httpClient.get<WeatherForecast[]>('api/SampleData/WeatherForecasts',  {
    //   observe: 'body',
    //   responseType: 'json'
    // }).subscribe((result: any) => {
    //   console.log(result);
    // });
    //
    // return this.weathers1;
  }


}

export interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
