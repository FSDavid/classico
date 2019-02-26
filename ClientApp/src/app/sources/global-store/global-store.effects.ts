import * as globalStoreActions from './global-store.actions';
import * as globalStoreReducer from './globalstores.reducers';

import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs/index';
import {catchError, map, mergeMap, retryWhen} from 'rxjs/internal/operators';
import {WeatherForecast} from '../../fetch-data/fetch-data.component';
import {GetUserInfo} from './global-store.actions';

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

  @Effect()
  getUserInfo: Observable<Action> = this.actions$.pipe(
    ofType<GetUserInfo>('GET_USER_INFO'),
    mergeMap((action) => {
        return this.httpClient.get('https://localhost:44312/api/dashboard/getuserinfo', {
          // headers: {'authorization' : 'Bearer ' + action.payload},
          observe: 'body',
          responseType: 'json'
        }).pipe(
          map(data => {
              return {type: 'SET_USER_INFO', payload: data };
            }
          ),
          catchError(() => [{type: 'LOGOUT'}])
        );
      }
    )
  );



  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<globalStoreReducer.GlobalstoresState>) {}

  errorHandler(error: Response) {
    console.log(error);
    return throwError(error);
  }
}



// storePersonSocialProfiles
