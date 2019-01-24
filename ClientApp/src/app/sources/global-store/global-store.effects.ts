import * as globalStoreActions from './global-store.actions';
import * as globalStoreReducer from './globalstores.reducers';

import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs/index';
import {map, switchMap} from 'rxjs/internal/operators';
import {WeatherForecast} from '../../fetch-data/fetch-data.component';

@Injectable()
export class GlobalStoreEffects {

  // @Effect()
  // getWeatherForecasts = this.actions$
  //   .ofType(globalStoreActions.GET_WEATHER_FORECASTS)
  //   .pipe (
  //     switchMap((action: globalStoreActions.GetWeatherForecasts) => {
  //       return this.httpClient.get<WeatherForecast[]>('api/SampleData/WeatherForecasts',  {
  //         observe: 'body',
  //         responseType: 'json'
  //       });
  //     }),
  //     map( (weatherForecasts: WeatherForecast[]) => {
  //         return {
  //           type: globalStoreActions.SET_WEATHER_FORECASTS,
  //           payload: weatherForecasts
  //         };
  //       })
  //   );



  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<globalStoreReducer.GlobalstoresState>) {}

  errorHandler(error: Response) {
    console.log(error);
    return throwError(error);
  }
}



// storePersonSocialProfiles
