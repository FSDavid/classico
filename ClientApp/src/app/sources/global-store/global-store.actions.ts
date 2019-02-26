
import {Action} from '@ngrx/store';
import {WeatherForecast} from '../../fetch-data/fetch-data.component';
import {UserModel} from '../models/user.model';

export const GET_WEATHER_FORECASTS = 'GET_WEATHER_FORECASTS';
export const SET_WEATHER_FORECASTS = 'SET_WEATHER_FORECASTS';
export const GET_USER_INFO = 'GET_USER_INFO';
export const SET_USER_INFO = 'SET_USER_INFO';

export class GetWeatherForecasts implements Action {
  readonly type = GET_WEATHER_FORECASTS;
  // constructor (public payload: string) {}
}

export class SetWeatherForecasts implements Action {
  readonly type = SET_WEATHER_FORECASTS;
  constructor (public payload: WeatherForecast[]) {}
}

export class GetUserInfo implements Action {
  readonly type = GET_USER_INFO;
}
export class SetUserInfo implements Action {
  readonly type = SET_USER_INFO;
  constructor (public payload: UserModel) {}
}


export type GstoreActions =
  GetWeatherForecasts |
  SetWeatherForecasts |
  GetUserInfo |
  SetUserInfo;
