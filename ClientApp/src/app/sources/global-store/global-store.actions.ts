
import {Action} from '@ngrx/store';
import {WeatherForecast} from '../../fetch-data/fetch-data.component';

export const GET_WEATHER_FORECASTS = 'GET_WEATHER_FORECASTS';
export const SET_WEATHER_FORECASTS = 'SET_WEATHER_FORECASTS';

export class GetWeatherForecasts implements Action {
  readonly type = GET_WEATHER_FORECASTS;
  // constructor (public payload: string) {}
}

export class SetWeatherForecasts implements Action {
  readonly type = SET_WEATHER_FORECASTS;
  constructor (public payload: WeatherForecast[]) {}
}

export type GstoreActions =
  GetWeatherForecasts |
  SetWeatherForecasts ;
